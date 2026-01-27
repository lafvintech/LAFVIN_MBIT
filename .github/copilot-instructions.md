# Copilot instructions for LAFVIN_MBIT

目的：帮助 AI 编码助手快速在本仓库中编写、修改和审核代码，聚焦硬件交互、MakeCode 注解和构建流程。

- **项目类型**：micro:bit / MakeCode 扩展（TypeScript），主要代码集中在 [main.ts](main.ts)。
- **主要文件**：[main.ts](main.ts)（所有命名空间与硬件逻辑），[pxt.json](pxt.json)（pxt 配置 / 依赖），[test.ts](test.ts)（示例/测试），[_locales/zh/mbit-strings.json](_locales/zh/mbit-strings.json)。

关键结构与模式
- 将功能按命名空间组织（例如 `mbit_Show`, `mbit_Sensors`, `mbit_Smartcar` 等），每个命名空间导出一组与硬件对应的函数和枚举，且使用 MakeCode 注释（`//%`）暴露到积木界面。修改或新增积木时，严格遵循现有 `//%` 注释样式与 `blockId` 命名惯例。
- 硬件访问主要通过 `pins`（`digitalReadPin`/`digitalWritePin`/`analogReadPin`/`analogWritePin`）、`pins.i2cWriteBuffer`/`i2cReadNumber` 及 `neopixel`。注意不同函数对 `AnalogPin` 与 `DigitalPin` 的预期类型。
- PWM 与缩放约定：仓库中多处对值进行缩放，例如对常规 PWM 使用 `value * 1024 / 256`，而 PCA9685 使用 `*16` 将 0-255 映射到 0-4095。不要随意更改这些缩放因子。
- I2C PCA9685：`mbit_Smartcar` 内实现了 `i2cwrite`/`i2cread`、`setPwm` 与 `setFreq`，常量如 `PCA9685_ADD` 在文件顶部定义。修改低级 I2C 行为要保持与这些抽象的一致性。
- 全局/单例 资源：`yahStrip: neopixel.Strip` 在 `mbit_Smartcar` 中以延迟初始化模式创建（`neopixel.create(DigitalPin.P16, 3, ...)`）。若新增类似资源，采用相同延迟初始化以避免重复创建。
- 传感器读数模式：超声波函数对 5 次读数排序并取中间 3 个的平均值（去掉异常值），这是稳健读取的约定。保持此模式在修改传感器代码时。

构建、测试与调试
- 本仓库使用 `pxt` 命令行，VS Code 提供了 Task：`build` (`pxt build`)、`deploy` (`pxt deploy`)、`clean` (`pxt clean`) 与 `serial` (`pxt serial`)。优先使用这些任务来编译或部署固件（例如 `Run Task -> build`）。
- 本地依赖：pxt 扩展依赖通过 `pxt.json` 管理，注意 `load dependency "mbit": "file:../pxt-mbit"` 的本地依赖惯例（检查 `pxt.json`）。

代码修改注意事项（仅限可观察到的约定）
- 不要重命名或删除导出的 `blockId`、枚举成员的 `blockId` 注释或公共函数签名，否则会破坏积木与用户项目兼容性。
- 修改硬件引脚或默认行为前，优先在 `main.ts` 中搜索所有对该引脚的引用，避免跨命名空间冲突。
- 新增积木请使用现有 `//%` 注释风格（`weight`、`blockGap`、`color`、`name.fieldEditor` 等），以保持在 MakeCode UI 的一致展示。
- 保持数字常量与缩放逻辑（例如 PWM 映射、超声波时间换算）的一致性；若确需更改，在注释中说明原因并调整所有使用处。

示例片段（参考）
- PWM 缩放（常规引脚）：
  - `pins.analogWritePin(pin, value * 1024 / 256);`  // value: 0-255
- PCA9685 缩放：
  - `speed1 = speed1 * 16; // map 0-255 to 0-4095` 
- 超声波取中间值：
  - `list.sort(); let length = (list[1] + list[2] + list[3]) / 3;`

当遇到不确定情况
- 若不确定是否可改动公共 API（例如 `blockId` 或枚举名），先在 PR 描述中标注并征求维护者确认。
- 若需要添加外部依赖或改变 `pxt.json`，在变更前在 issue 中记录理由并运行 `pxt build` 验证。

我已把此文件写入仓库，若需要我可以：
- 合并现有 README 中的特定说明到此文件；
- 将部分规则转换为 lint/CI 检查脚本（需要额外讨论）。

---
请告知是否需要补充具体示例或把某些硬件细节补充到文档里。
