# color-token

simple tonal palettes generator with javascript

## How to use

```javascript
import { generateColorPalette } from "color-token";

const colorPalette = generateColorPalette("gray", "#cdcdcd");

console.log(colorPalette.gray500);
```

## Utils

### Color Picker

- **brightness**

  > use Color Model `YUV`

  ```javascript
  import { ColorPicker } from "color-token";
  console.log(ColorPicker.brightness("#3f2ed2")); // 75.955
  ```

- **luminance**

  > use Color Model `YIQ`

  ```javascript
  import { ColorPicker } from "color-token";
  console.log(ColorPicker.luminance("#3f2ed2")); // 69.779
  ```

- **saturation**
  > use Color Model `HSL`
  ```javascript
  import { ColorPicker } from "color-token";
  console.log(ColorPicker.saturation("#3f2ed2")); // 0.6456692913385826
  ```

### Color Adjustment

- **opacity**

  ```javascript
  import { ColorAdjustment } from "color-token";
  console.log(ColorAdjustment.opacity("#3f2ed2", 0.5));
  ```

- **brightness**

  ```javascript
  import { ColorAdjustment } from "color-token";
  console.log(ColorAdjustment.brightness("#3f2ed2", -0.2));
  ```

- **blendColors**

  ```javascript
  import { ColorAdjustment } from "color-token";
  console.log(ColorAdjustment.blendColors("#3f2ed2", "#a1fe23", 0.4));
  ```

- **gray**

  ```javascript
  import { ColorAdjustment } from "color-token";
  console.log(ColorAdjustment.gray("#3f2ed2"));
  ```

### Support Color Model

- [x] rgb
- [x] hex
- [x] hsl
- [x] lab
- [x] cmyk
- [x] yiq
- [x] yuv
- [x] yCbCr
