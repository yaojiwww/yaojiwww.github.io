---
title: 快速开始（标准库）
categories: STM32
---
产品命名规则：

# 启动startup

# GPIO
时钟Clock（充当开关作用）：
函数名：RCC_APB2PeriphClockCmd（标准库）/
函数定义：
```c
// 位置：stm32f10x_rcc.h
void RCC_APB2PeriphClockCmd(uint32_t RCC_APB2Periph, FunctionalState NewState);
// 位置：stm32f10x_rcc.c
void RCC_APB2PeriphClockCmd(uint32_t RCC_APB2Periph, FunctionalState NewState)
{
  /* 1. 断言：检查输入参数是否合法（就是你之前看到的那个） */
  assert_param(IS_RCC_APB2_PERIPH(RCC_APB2Periph));
  assert_param(IS_FUNCTIONAL_STATE(NewState));

  /* 2. 核心逻辑：判断是要开启还是关闭 */
  if (NewState != DISABLE)
  {
    /* 开启：通过“位或”运算，把对应寄存器的位置 1 */
    RCC->APB2ENR |= RCC_APB2Periph;
  }
  else
  {
    /* 关闭：通过“位与非”运算，把对应寄存器的位置 0 */
    RCC->APB2ENR &= ~RCC_APB2Periph;
  }
}
```

# NVIC
# EXTI
# SysTick
# TIM
`SDK`：software develop kits，软件开发工具包，像stm32里的标准库、hal库就属于SDK
`轮询`：CPU不断地去询问一个端口引脚，例如在while里循环读取PA0的状态检测KEY1按键状态，这样会一直占有CPU，造成阻塞

# 舵机（伺服电机）

# 外部中断
```c
#include "stm32f10x.h"

// 宏定义引脚
#define LED_CLK RCC_APB2Periph_GPIOE
#define LED_PORT GPIOE
#define LED_PIN GPIO_Pin_5

#define KEY_CLK RCC_APB2Periph_GPIOA
#define KEY_PORT GPIOA
#define KEY_PIN GPIO_Pin_0

#define KEY_EXTI_

// LED操作
#define LED_ON GPIO_Set(LED_PORT,LED_PIN);
#define LED_OFF GPIO_Reset(LED_PORT,LED_PIN);
#define LED_TOGGLE if(GPIO_ReadPin(LED_PORT,LED_PIN)){GPIO_Reset(LED_PORT,LED_PIN);}else GPIO_Set(LED_PORT,LED_PIN);

// LED初始化
void LED_Init(void){
	GPIO_InitTypedef GPIO_InitStructure;
	
	RCC_APB2PeriphClockCmd(LED_PORT,ENABLE);
	GPIO_InitStructure.pin = LED_PIN;
	GPIO_InitStructure.mode = GPIO_Mode_Out_PP;
	GPIO_InitStructure.speed = GPIO_Speed_50Mhz;
	
	GPIO_Init(LED_PORT,&GPIO_InitStrucure);
}
// KEY初始化
void KEY_EXTI_Init(void){
	GPIO_InitTypedef GPIO_InitStructure
	NVIC_InitTypedef NVIC_InitStructure
	EXTI_InitTypedef EXTI_InitStructure
	
	
}
int main(){
	LED_Init();
}

``` 
Flash：芯片内部自带的一块存储器，断电后数据还在，烧录代码就是写进Flash里。

STM32的3种启动方式：
1. 主闪存存储器（Flash）：读的快，擦除的也快
2. 系统存储器：也是一种闪存（Flash），存储特定程序（boot loader，系统引导加载程序，无法被擦除）
3. 内置SRAM：存储Flash里面的变量变化的值，断电丢失
系统存储器启动模式烧录程序：BOOT0置为1，BOOT1不动（0），切换到系统存储器模式，然后Reset复位（因为系统复位后，会发送SYSCLK，在它的第四个上升沿中，芯片会读取（锁存）BOOT引脚的值）。

AI助学
1. 看不懂的代码概念，不要让ai直接解释，让它类比生活中的例子，然后再对照理解
2. 程序错误，但是找不出来的时候，让ai以引导的方式向我提问可能点，然后我自己去对照查找检查
3. 写新的程序时没有思路，让ai给我思路，苏格拉底提问法，引导我独自查手册学会
4. 不知道用什么函数时，ai引导我去手册查找并使用

Mac应用程序强制退出快捷键：`option+command+ESC`



