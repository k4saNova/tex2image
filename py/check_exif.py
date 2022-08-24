import sys

from PIL import Image
import PIL.ExifTags as ExifTags

def main():
    path = sys.argv[1]
    image = Image.open(path)
    print(image)
    print(image._getexif())
    exif = {}
    if image._getexif():
        for k, v in image._getexif().items():
            if k in ExifTags.TAGS:
                exif[ExifTags.TAGS[k]] = v
    print(exif)

if __name__ == "__main__":
    main()
