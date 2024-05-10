# Information for Docker

Docker 사용법/명령어/이슈 정리

---

## Mac에 Rosetta를 설치해야 하는 경우

Intel 프로세서가 장착된 Mac용으로 제작된 앱을 Apple Silicon이 장착된 Mac에서 사용할 수 있도록 하려면, mac에
Rosetta 2를 설치해야 한다.

예를 들어, x86 아키텍처에서 동작하는 Docker 환경에서 ARM 아키텍처의 바이너리를 실행해야 할 때 Rosetta를
사용할 수 있다.

Rosetta를 사용하면 다른 아키텍쳐의 바이너리를 컨테이너 환경에서 실행할 수 있으므로, 다양한 플랫폼 간의 이식성을
높일 수 있다. 이는 특정 아키텍처에 종속되지 않고 효율적인 배포와 관리를 할 수 있는 장점을 제공한다.

따라서, Mac M1이상(ARM64)를 사용하고 있다면 아래의 명령어로 Rosetta 를 설치하는 것을 권장한다.

```shell
softwareupdate --install-rosetta

# I have read and agree to the terms of the software license agreement. A list of Apple SLAs may be found here: https://www.# # apple.com/legal/sla/
# Type A and press return to agree: a
# 2024-05-10 17:57:49.965 softwareupdate[76925:14344770] Package Authoring Error: 052-40580: Package reference com.apple.pkg.RosettaUpdateAuto is missing installKBytes attribute
# Install of Rosetta 2 finished successfully
```

- [Mac에 Rosetta를 설치해야 하는 경우](https://support.apple.com/ko-kr/102527)

---

## Docker Image for node 20.11.0

본 프로젝트에서 사용하는 node version 20.11.0에 대한 alpine 이미지는 아래와 같다.

- [node:20.11-alpine](https://hub.docker.com/layers/library/node/20.11-alpine/images/sha256-f4c96a28c0b2d8981664e03f461c2677152cd9a756012ffa8e2c6727427c2bda)

---

## Docker 명령어 정리

### docker image 삭제

```shell
docker rmi [image id or name]
```

### docker container 삭제

```shell
docker rm [container id or name]
```

### docker image 생성하기(from your dockerfile)

```shell
docker build [OPTIONS] PATH | URL | -
```

- -f, --file: 사용할 Dockerfile의 경로를 지정합니다. 기본적으로 도커는 현재 디렉토리에 있는 Dockerfile을 사용합니다.
- --build-arg: 빌드 시에 사용할 빌드 인수를 설정합니다. Dockerfile 내에서 ARG 지시어를 사용하여 접근할 수 있습니다.
- -t, --tag: 생성되는 이미지에 태그를 지정합니다. <이미지\_이름>:<태그> 형식으로 지정합니다.
- --target: 멀티스테이지 빌드에서 목표 빌드 스테이지를 지정합니다.
- --network: 빌드 컨텍스트를 가져오는 데 사용되는 네트워크를 지정합니다.
- --compress: 빌드 컨텍스트를 전송할 때 압축을 사용합니다.
- --progress: 빌드 진행 상황을 표시하는 방법을 지정합니다.
- --no-cache: 캐시를 사용하지 않고 빌드를 진행합니다.
- --pull: 빌드 전에 베이스 이미지를 항상 업데이트합니다.

```shell
# 현재 terminal의 경로가 app 폴더이고, app 폴더 안에 docker 폴더 안에 Dockerfile.* 이 있는 경우
# app 폴더(프로젝트 루트)안에 Dockerfile.* 이 바로 있는 경우 -f 옵션은 필요가 없다.
docker build -t node-local:0.1 -f ./docker/Dockerfile.local .
```

### docker image 로 컨테이서 생성하기

```shell
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

- -d, --detach: 컨테이너를 백그라운드에서 실행합니다.
- --name: 컨테이너에 이름을 지정합니다.
- -p, --publish: 호스트와 컨테이너 간의 포트 매핑을 설정합니다.
- -v, --volume: 호스트와 컨테이너 간의 볼륨을 마운트합니다.
- -e, --env: 환경 변수를 설정합니다.
- --network: 컨테이너를 특정 네트워크에 연결합니다.
- --rm: 컨테이너가 종료되면 자동으로 삭제합니다.
- -it: 대화형 터미널을 사용하여 컨테이너를 실행합니다.
- --restart: 컨테이너의 재시작 정책을 설정합니다.
- --privileged: 컨테이너에 모든 권한을 부여합니다.

```shell
ex: docker run -it --name be-local -p 3000:3000 node-local
```

### docker 컨테이너에 접속하기

```shell
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

- -d, --detach: 실행 중인 컨테이너에서 명령을 백그라운드로 실행합니다.
- -i, --interactive: 명령을 대화형으로 실행합니다.
- -t, --tty: 가상의 터미널(TTY)을 할당하여 명령을 실행합니다.
- --user: 명령을 특정 사용자 또는 UID로 실행합니다.
- --privileged: 컨테이너에서 명령을 특권 모드로 실행합니다.
- --env: 실행되는 환경 변수를 설정합니다.
- --workdir: 명령을 실행할 작업 디렉토리를 설정합니다.
- --userns: 사용자 네임스페이스를 지정합니다.

ex: docker exec -it node-local bash
ex: docker exec -it node-local /bin/sh

### Issue

#### Issue 202405110200

아래와 같이 이미지를 만들고 컨테이너를 실행했을 때 에러가 발생하였다.

```shell
docker build -t node-local:0.2 -f ./docker/Dockerfile.local .
docker run -it --name be-local -p 3000:3000 node-local:0.2
```

error log 는 아래와 같다.

```shell
Debugger listening on ws://127.0.0.1:9229/75e9f6de-7a22-4cf7-807a-3449c77d908e
For help, see: https://nodejs.org/en/docs/inspector
Error: Error loading shared library /app/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node: Exec format error
    at Object.Module._extensions..node (node:internal/modules/cjs/loader:1473:18)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1023:12)
    at Module.require (node:internal/modules/cjs/loader:1235:19)
    at require (node:internal/modules/helpers:176:18)
    at Object.<anonymous> (/app/node_modules/bcrypt/bcrypt.js:6:16)
    at Module._compile (node:internal/modules/cjs/loader:1376:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1023:12)
```

#### 해결 방법

프로젝트 root path 에 .dockerignore 파일을 생성하고, node_modules 를 추가 후 이미지를 재생성한다.
추가적으로 Dockerfile를 아래와 같이 수정한다.

```Dockerfile
RUN npm cache clean --force && rm -rf node_modules && npm install
```

bycrypt가 아닌 bycryptjs를 설치하는 것도 하나의 방법이지만, bycryptjs는 오랫동안 maintain 되지 않았고,
bycrypt를 사용하는 것을 권장하므로, bycryptjs를 사용하는 방버은 채택하지 않았다.

Ref: [Error while building a docker image #824](https://github.com/kelektiv/node.bcrypt.js/issues/824)

---

### Ref for Docker

- https://discord.com/channels/1189789451296186469/1230490725964058674
- https://github.com/drum-grammer/docker-pro-2308/blob/main/lecture/1st/cli.md
