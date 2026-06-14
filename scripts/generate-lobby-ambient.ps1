Add-Type -AssemblyName System.Drawing

$assetDir = Join-Path $PSScriptRoot "..\assets"
$basePath = Join-Path $assetDir "lobby-forest-camp.png"
$outputPattern = Join-Path $assetDir "lobby-forest-camp-frame-{0}.png"

$source = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class LobbyFrameGenerator
{
    public static void Generate(string inputPath, string outputPattern)
    {
        using (var source = Image.FromFile(inputPath))
        using (var sourceBitmap = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb))
        {
            using (var graphics = Graphics.FromImage(sourceBitmap))
            {
                graphics.InterpolationMode = InterpolationMode.NearestNeighbor;
                graphics.PixelOffsetMode = PixelOffsetMode.Half;
                graphics.SmoothingMode = SmoothingMode.None;
                graphics.DrawImage(source, 0, 0, source.Width, source.Height);
            }

            int stride;
            var sourcePixels = ReadPixels(sourceBitmap, out stride);

            for (int frame = 0; frame < 4; frame++)
            {
                var framePixels = (byte[])sourcePixels.Clone();
                ApplyWaterFlow(sourcePixels, framePixels, stride, sourceBitmap.Width, sourceBitmap.Height, frame);
                ApplyFoliageSway(sourcePixels, framePixels, stride, sourceBitmap.Width, sourceBitmap.Height, frame);
                ApplyFireFlicker(sourcePixels, framePixels, stride, sourceBitmap.Width, sourceBitmap.Height, frame);

                using (var bitmap = new Bitmap(sourceBitmap.Width, sourceBitmap.Height, PixelFormat.Format32bppArgb))
                {
                    WritePixels(bitmap, framePixels, stride);
                    var outputPath = String.Format(outputPattern, frame + 1);
                    bitmap.Save(outputPath, ImageFormat.Png);
                    Console.WriteLine("wrote " + outputPath);
                }
            }
        }
    }

    private static byte[] ReadPixels(Bitmap bitmap, out int stride)
    {
        var rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
        var data = bitmap.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        try
        {
            stride = data.Stride;
            int bytes = Math.Abs(data.Stride) * bitmap.Height;
            var pixels = new byte[bytes];
            Marshal.Copy(data.Scan0, pixels, 0, bytes);
            return pixels;
        }
        finally
        {
            bitmap.UnlockBits(data);
        }
    }

    private static void WritePixels(Bitmap bitmap, byte[] pixels, int stride)
    {
        var rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
        var data = bitmap.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
        try
        {
            int bytes = Math.Abs(stride) * bitmap.Height;
            Marshal.Copy(pixels, 0, data.Scan0, bytes);
        }
        finally
        {
            bitmap.UnlockBits(data);
        }
    }

    private static void ApplyWaterFlow(byte[] source, byte[] target, int stride, int width, int height, int frame)
    {
        double waterWave = frame * Math.PI * 0.5;
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                int index = Index(x, y, stride);
                if (!IsWater(source, index, y, height))
                {
                    continue;
                }

                int rippleStrength = (int)Math.Round(Math.Sin((x * 0.055) + (y * 0.09) + waterWave) * 18.0);
                int streamBand = (int)Math.Round(Math.Sin((x * 0.018) - (y * 0.045) + waterWave * 1.7) * 10.0);
                int shimmer = rippleStrength + streamBand;
                target[index] = Clamp(source[index] + shimmer + 4);
                target[index + 1] = Clamp(source[index + 1] + shimmer / 2 + 2);
                target[index + 2] = Clamp(source[index + 2] - 2);
            }
        }
    }

    private static void ApplyFoliageSway(byte[] source, byte[] target, int stride, int width, int height, int frame)
    {
        double foliageWave = frame * Math.PI * 0.5;
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                int index = Index(x, y, stride);
                if (!IsWindFoliageZone(x, y, width, height) || !IsFoliage(source, index))
                {
                    continue;
                }

                int swayHighlight = (int)Math.Round(Math.Sin((x * 0.035) + (y * 0.026) + foliageWave) * 12.0);
                int shadowRoll = (int)Math.Round(Math.Sin((x * 0.018) - (y * 0.031) + foliageWave * 1.4) * 6.0);
                int value = swayHighlight + shadowRoll;
                target[index] = Clamp(source[index] + value / 4);
                target[index + 1] = Clamp(source[index + 1] + value);
                target[index + 2] = Clamp(source[index + 2] + value / 5);
            }
        }
    }

    private static void ApplyFireFlicker(byte[] source, byte[] target, int stride, int width, int height, int frame)
    {
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                int index = Index(x, y, stride);
                if (!IsFire(source, index))
                {
                    continue;
                }

                int flicker = (frame == 1 || frame == 3) ? 14 : -5;
                target[index] = Clamp(source[index] - 2);
                target[index + 1] = Clamp(source[index + 1] + flicker);
                target[index + 2] = Clamp(source[index + 2] + flicker);
            }
        }
    }

    private static bool IsWater(byte[] pixels, int index, int y, int height)
    {
        int b = pixels[index];
        int g = pixels[index + 1];
        int r = pixels[index + 2];
        int a = pixels[index + 3];
        return a > 0 && y > height * 0.16 && b > 100 && g > 72 && r < 136 && b > r + 18;
    }

    private static bool IsFoliage(byte[] pixels, int index)
    {
        int b = pixels[index];
        int g = pixels[index + 1];
        int r = pixels[index + 2];
        int a = pixels[index + 3];
        return a > 0 && g > 68 && g > r + 8 && g > b + 3;
    }

    private static bool IsWindFoliageZone(int x, int y, int width, int height)
    {
        return y < height * 0.38 || x < width * 0.18 || x > width * 0.70 || y > height * 0.76;
    }

    private static bool IsFire(byte[] pixels, int index)
    {
        int b = pixels[index];
        int g = pixels[index + 1];
        int r = pixels[index + 2];
        int a = pixels[index + 3];
        return a > 0 && r > 168 && g > 70 && b < 120;
    }

    private static int Index(int x, int y, int stride)
    {
        return y * stride + x * 4;
    }

    private static byte Clamp(int value)
    {
        if (value < 0) return 0;
        if (value > 255) return 255;
        return (byte)value;
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies "System.Drawing"
[LobbyFrameGenerator]::Generate($basePath, $outputPattern)
