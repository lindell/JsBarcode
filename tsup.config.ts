import { defineConfig } from 'tsup';

const commonConfig = {
  format: ['cjs', 'esm'] as ('cjs' | 'esm')[],
  dts: true,
  clean: true,
  minify: false,
  sourcemap: true,
};

export default defineConfig([
  { entry: ['packages/core/src/index.ts'], outDir: 'packages/core/dist', tsconfig: 'packages/core/tsconfig.json', ...commonConfig },
  { entry: ['packages/renderer/canvas/src/index.ts'], outDir: 'packages/renderer/canvas/dist', tsconfig: 'packages/renderer/canvas/tsconfig.json', ...commonConfig },
  { entry: ['packages/renderer/svg/src/index.ts'], outDir: 'packages/renderer/svg/dist', tsconfig: 'packages/renderer/svg/tsconfig.json', ...commonConfig },
  { entry: ['packages/barcodes/code128/src/index.ts'], outDir: 'packages/barcodes/code128/dist', tsconfig: 'packages/barcodes/code128/tsconfig.json', ...commonConfig },
  { entry: ['packages/barcodes/code39/src/index.ts'], outDir: 'packages/barcodes/code39/dist', tsconfig: 'packages/barcodes/code39/tsconfig.json', ...commonConfig },
  { entry: ['packages/barcodes/codabar/src/index.ts'], outDir: 'packages/barcodes/codabar/dist', tsconfig: 'packages/barcodes/codabar/tsconfig.json', ...commonConfig },
  { entry: ['packages/barcodes/ean-upc/src/index.ts'], outDir: 'packages/barcodes/ean-upc/dist', tsconfig: 'packages/barcodes/ean-upc/tsconfig.json', ...commonConfig },
  { entry: ['packages/barcodes/itf/src/index.ts'], outDir: 'packages/barcodes/itf/dist', tsconfig: 'packages/barcodes/itf/tsconfig.json', ...commonConfig },
  { entry: ['packages/barcodes/msi/src/index.ts'], outDir: 'packages/barcodes/msi/dist', tsconfig: 'packages/barcodes/msi/tsconfig.json', ...commonConfig },
  { entry: ['packages/barcodes/pharmacode/src/index.ts'], outDir: 'packages/barcodes/pharmacode/dist', tsconfig: 'packages/barcodes/pharmacode/tsconfig.json', ...commonConfig },
  { entry: ['packages/barcodes/generic-barcode/src/index.ts'], outDir: 'packages/barcodes/generic-barcode/dist', tsconfig: 'packages/barcodes/generic-barcode/tsconfig.json', ...commonConfig },
  { entry: ['packages/jsbarcode/src/index.ts'], outDir: 'packages/jsbarcode/dist', tsconfig: 'packages/jsbarcode/tsconfig.json', ...commonConfig },
]);
