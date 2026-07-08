---
title: 快速开始
categories: STM32
---
# 介绍

# 工具链准备&环境配置
## 工具链选择
- `STM32CubeMX`
- `Virtual Studio Code`
- `Cmake`
- `gcc-arm-embedded`
- `ninja`（比`make`更快的构建构建系统）：在系统中充当
- `OpenOCD`
## Mac 安装
### Homebrew 安装开发工具包
在`mac`上通常使用`Homebrew`来管理所有的开发工具，使用终端命令安装：
```zsh
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
```
安装核心依赖
```zsh
    brew install cmake ninja openocd gcc-arm-embedded
    或者单独安装完整 gcc-arm-embedded 包
    brew install --cask gcc-arm-embedded
```
验证安装
```zsh
cmake --version
ninja --version
openocd --version
arm-none-eabi-gcc --version # 不是gcc-arm-embedded --version
```
如果需要卸载，请用以下命令
```zsh
# brew 命令工具包
brew uninstall cmake 
brew uninstall ninja 
brew uninstall openocd 
brew uninstall gcc-arm-embedded
# 查看是否卸载
which cmake
which ninja
which openocd
which arm-none-eabi-gcc
```
### STM32CubeMX 下载
访问 ST 官网下载**STM32CubeMX for macOS**
官网链接：https://www.st.com/en/development-tools/stm32cubemx.html
### VS Code 插件配置
在VS Code 插件市场安装以下三个关键插件
- **C/C++ Extension Pack** (微软官方)  
- **CMake Tools** (用于处理 CMakeLists.txt)  
- **Cortex-Debug** (用于硬件调试)
## Win 安装
# 初始化项目
## STM32CubeMX生成代码
1. 新建工程及芯片选型
	- 打开STM32CubeMX，在Home主页选择`ACCESS TO MCU SELECTOR`。
	- 在`Commercial Part Number`搜索框输入并选择你需要的STM32芯片型号（例如常见的`STM32F103C8T6`）
	- 点击右上角`Start Project`
2. 基础系统配置
	- **SYS(System)**：展开 `System Core` -> `SYS`，将`Debug`选项设置成`Serial Wire`。
	- **RCC (Clock)**: 展开 `System Core` -> `RCC`，如果您的开发板有外部晶振，将 `High Speed Clock (HSE)` 设置为 `Crystal/Ceramic Resonator`。
	- **时钟树 (Clock Configuration)**: 切换到 `Clock Configuration` 标签页，将 `HCLK (MHz)` 配置为你的芯片支持的最高频率（如 F103 填 72，回车让软件自动计算倍频）。
3. 配置所需的硬件接口
4. 配置为CMake工程并生成代码
	- 进入 `Project Manager` 选项卡。
	- 设置 `Project Name`（例如 `MyModuleProject`）和保存路径。
	- 在 `Toolchain / IDE` 下拉菜单中，选择 `CMake`。
	- 点击右上角的 **`Generate Code`**。
## 在CMake工程中添加驱动代码
1. 创建用户驱动文件夹
	- 在工程根目录（与Core同级）新建一个文件夹，命名为`User`，里面存放我们即将编写的模块驱动源文件（例如`module.c`和`module.h`）。
2. 修改`CMakeLists.txt`
	- 打开根目录的`CMakeLists.txt
	- 找到 `target_include_directories` 部分，把您新建的头文件路径加进去：
		```Cmake 
		# Add include pathstarget_include_directories(${CMAKE_PROJECT_NAME} PRIVATE
			# Add user defined include paths
		)
		```

# 编写代码

# 编译&烧录
openocd -f interface/stlink.cfg -f target/stm32f1x.cfg -c "program OBJ/OLED.hex verify reset exit"
## 编译工程
- 命令行编译
```Bash
mkdir build
cd build
cmake -G "MinGW Makefiles" ..  # Windows下常用（需安装MinGW），或者用 Ninja：cmake -G Ninja ..
make                           # 开始编译
```

## 烧录