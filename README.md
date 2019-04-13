# TT-CNPM

## 1. Giới thiệu
Source code hiện thực website phục vụ việc học online

## 2. Hướng dẫn

### 2.1. Cài đặt docker:
- Mac version: https://hub.docker.com/editions/community/docker-ce-desktop-mac
- Window version: https://hub.docker.com/editions/community/docker-ce-desktop-windows
Note: Sau khi cài docker cho window, vô setting docker enabled các ổ đĩa trong "Shared Drives"
- Ubuntu:
```
sudo apt-get update && sudo apt-get upgrade && sudo apt-get install docker && sudo apt-get install docker-compose
```

### 2.1. Install package nodejs:
- Thêm tên và version package vào `dependencies` trong file package.json

## 3. Run

### 3.1. Run
- Mac vs ubuntu: 
```
make run
```
- Windowns:
```
docker-compose up
```
