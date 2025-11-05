
---
title: Arch Linux 安装邪修流程
published: 2025-11-02
description: 我是邪修。我才不選純命令行
tags: [Arch Linux, KDE, Ventoy, Linux, 教程]
category: Linux
draft: false
---

> 以 [Arch Wiki](https://wiki.archlinux.org) 为准。
---

## 1. 前期准备

| 项目 | 推荐方案 |
|------|----------|
| U 盘 | ≥ 4 GB |
| 镜像 | [Offical ISO](https://mirrors.aliyun.com/archlinux/iso/latest/archlinux-2025.10.01-x86_64.iso) |
| 写入工具 | [Ventoy](https://www.ventoy.net/cn/index.html) |
| 网络 | 我选的是有线网 |
| 分区方案 | 1×EFI 512 MB + 1×Swap 8 GB + 1×Root |

---

## 2. 制作 Ventoy 启动盘

1. Windows 下插入 U 盘，运行 `Ventoy2Disk.exe` ，安装，提示清空数据则选“是”。  
2. 把下载好的 `archlinux-2025.10.01-x86_64.iso` 直接复制进 U 盘根目录。  
3. 重启，选 U 盘启动，进入 Ventoy 菜单，选中 Arch ISO 回车。

如果已经是 Linux 用户，可使用 Ventoy LiveCD。

1. Linux 插入 U 盘，前往 `Ventoy 官网` 下载 Ventoy LiveCD 镜像，如果是纯命令行使用 `curl -O` 下载即可
2. `lsblk` 查看插入的 U 盘，例如 `/dev/sda`
3. 直接 `dd if=xxxxx.iso of=/dev/sdX`
4. 过一会就好了。随后使用 U 盘启动
5. 启动后为 U 盘自己安装 Ventoy 即可。
6. 返回 Linux，下载 `archlinux-2025.10.01-x86_64.iso` 镜像，挂载 U 盘，把 ISO 复制到 U 盘根目录
7. 使用 U 盘启动，选中 Arch ISO 启动，两个模式都可以。

---

## 3. 进入 Live 环境

看见登录成功后直接

```bash
# 先 ping 一下
ping www.baidu.com
```

如果连不上就转 4

---

4. 联网

```bash

# 无线示例（iwctl 交互）
iwctl
[iwctl] device list          # 看无线网卡名，如 wlan0
[iwctl] station wlan0 scan
[iwctl] station wlan0 get-networks
[iwctl] station wlan0 connect Wi-Fi名
[iwctl] exit
```

---

5. 邪修换源

```bash
bash <(curl -sSL https://linuxmirrors.cn/main.sh)
```
然后一路回车，看见方块字你也回车，直到看见广告。

这一步很重要，只是这样比较快。如果你是专业用户我不推荐你这么干。

---

6. Arch Install

```bash
archinstall
```

Profile 那里选择 Desktop，然后再选 KDE Plasma 就行了。或者别的桌面环境也可以，这里只是新手推荐。

---

7. 安装后重启即可

```bash
reboot
```

这一步小学鸡都会吧。

---

8. 进入桌面环境

先安装字体
 
```bash
sudo pacman -S adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts
sudo pacman -S noto-fonts-cjk wqy-microhei wqy-zenhei ttf-arphic-ukai ttf-arphic-uming
```

9. 安装中文输入法

```bash
sudo pacman -S fcitx5-im fcitx5-chinese-addons fcitx5-rime
```

如果你是 Wayland，直接安装后在系统设置里找键盘 -> 虚拟键盘 -> Fcitx5 Wayland 启动器，勾选后应用。

如果部分软件，例如 QQ 无法使用输入法，则添加环境变量

```bash
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```

10. 随后打开系统设置 -> 语言和区域添加简体中文，再注销重进

11. 安装 ArchLinuxCN 源

在 /etc/pacman.conf 文件末尾添加以下两行

```bash
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

然后执行

```bash
sudo pacman -Syu
sudo pacman -S archlinuxcn-keyring
```

12. 安装 Paru

由于一些奇奇怪怪的问题，我的 yay 一直会出现连不上的问题，所以还是 Paru 吧。

直接

```bash
sudo pacman -S paru
```

我不推荐修改 `aururl`，官方 aur 源就够用了，而且也只是从 aur 源里下载 PKGBUILD，换源和不换源没啥区别。

13. 安装 Clash 以更快地使用 aur 源安装

由于 `饭桶大厅` 在国内常常抽风，下载速度也慢的一批，所以这又是邪修来的

执行

```bash
paru -G clash-verge-rev-bin
```

使用 Nano 打开 PKGBUILD

```bash
nano ~/.cache/paru/clone/clash-verge-rev-bin/PKGBUILD
```

找到 `github` 那一段的链接，在前面添加 `https://gh-proxy/`

然后 cd 到这个目录，直接
```bash
paru -U
```

会生成一个包，用这个指令不会自己安装，需要手动

```bash
makepkg -si
```

一下，它会自动帮你安装上。

然后添加自己机场的 `yaml` 文件即可。

## 结束