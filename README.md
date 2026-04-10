# 🧠 baekjoon-writeups

Notion에 정리한 **백준(BOJ) 알고리즘 풀이를 GitHub로 자동 동기화**하는 저장소입니다.  
(✅ **Published** 체크된 항목만 반영)

[![Solved.ac 프로필](http://mazassumnida.wtf/api/v2/generate_badge?boj=psjo1207)](https://solved.ac/psjo1207)

- **Main Language:** C++
- **Automation:** Notion → GitHub Actions
- **Focus:** 알고리즘 유형별 사고 과정 정리

---

## 📌 Overview

- 백준 문제 풀이를 **Notion DB에 정리**
- GitHub Actions로 **Markdown 변환 + 자동 커밋**
- 알고리즘 유형별 **인덱스 / 통계 / 최신 목록 자동 생성**

> ✔️ 수동 커밋 없음  
> ✔️ 풀이 누락 없음  
> ✔️ 공부 흐름 그대로 보존

---

## 🛠 Tech Stack

| Category | Stack |
|---|---|
| Language | **C++ (Main)** |
| Docs | Notion |
| Automation | GitHub Actions |
| Runtime | Node.js |
| Platform | Baekjoon Online Judge |

---

## 📂 Repository Structure
```
📦 repo
┣ 📂 docs/baekjoon
┃ ┣ 📂 problems # BOJ 번호별 write-up
┃ ┃ ┣ 2667.md
┃ ┃ ┗ ...
┃ ┣ 📂 bfs # 알고리즘별 인덱스
┃ ┃ ┗ index.md
┃ ┣ 📂 dfs
┃ ┃ ┗ index.md
┃ ┣ 📂 dp
┃ ┃ ┗ index.md
┃ ┗ ...
┣ 📂 scripts
┃ ┗ notion-sync.mjs # Notion → Markdown 변환 스크립트
┣ 📂 .github/workflows
┃ ┗ notion-sync.yml # 자동 커밋 파이프라인
┗ 📜 README.md
```
---

## 📝 Write-up Policy

각 문제는 다음 기준으로 정리합니다.

- 문제 요약
- 접근 아이디어
- 사용 알고리즘
- 시간 / 공간 복잡도
- 주의할 점
- C++ 구현 코드

> 📌 **코드보다 사고 과정 우선**

---

## 🎯 Goals

- 알고리즘 유형별 체계적 학습
- Gold 이상 문제 비중 확대
- C++ STL 활용 능력 강화
- 코딩 테스트 실전 대응력 향상

---

## 📌 Note

- 문제 출처: https://www.acmicpc.net/
- 모든 풀이는 개인 학습용입니다.
- 문제의 저작권은 백준 온라인 저지에 있습니다.

---

<!-- AUTO-GENERATED:START -->
## Links
- Code repo: **https://github.com/Shin-j0/baekjoon-solutions**

## Stats
- Total published: **29**

### By Tier
| Tier | Count |
|---|---:|
| GOLD 2 | 1 |
| GOLD 4 | 4 |
| GOLD 5 | 8 |
| SILVER 1 | 7 |
| SILVER 2 | 6 |
| SILVER 3 | 3 |

### By Algorithm
| Algorithm | Count |
|---|---:|
| BFS | 13 |
| DFS | 9 |
| DP | 4 |
| Priority Queue | 3 |
| Graph | 3 |
| Burte force | 2 |
| Implementation | 2 |
| Greedy | 2 |
| Que | 2 |
| Heap | 2 |
| Binary Search | 1 |
| Divide and Conquer | 1 |
| Deque | 1 |
| Map | 1 |
| Dijkstra | 1 |
| String | 1 |

## Latest (Top 10)
| BOJ | Write-up | Tier | Algorithms | Code | Date |
|---:|---|---|---|---|---|
| [30804](https://www.acmicpc.net/problem/30804) | [과일 탕후루](docs/baekjoon/problems/30804.md) | SILVER 2 | Burte force, Implementation | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/30804.cpp) | 2026-02-02 |
| [1167](https://www.acmicpc.net/problem/1167) | [트리의 지름](docs/baekjoon/problems/1167.md) | GOLD 2 | BFS, Graph | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/1167.cpp) | 2026-02-02 |
| [14500](https://www.acmicpc.net/problem/14500) | [테트로미노](docs/baekjoon/problems/14500.md) | GOLD 5 | Burte force, Implementation | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/14500.cpp) | 2026-01-26 |
| [5525](https://www.acmicpc.net/problem/5525) | [IOI](docs/baekjoon/problems/5525.md) | SILVER 1 | String | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/5525.cpp) | 2026-01-25 |
| [1043](https://www.acmicpc.net/problem/1043) | [거짓말](docs/baekjoon/problems/1043.md) | GOLD 4 | BFS, Graph | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/1043.cpp) | 2026-01-22 |
| [16928](https://www.acmicpc.net/problem/16928) | [뱀과 사다리 게임](docs/baekjoon/problems/16928.md) | GOLD 5 | BFS | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/16928.cpp) | 2026-01-19 |
| [1541](https://www.acmicpc.net/problem/1541) | [잃어버린 괄호](docs/baekjoon/problems/1541.md) | SILVER 2 | Greedy | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/1541.cpp) | 2026-01-11 |
| [9019](https://www.acmicpc.net/problem/9019) | [DSLR](docs/baekjoon/problems/9019.md) | GOLD 4 | BFS | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/9019.cpp) | 2026-01-11 |
| [21736](https://www.acmicpc.net/problem/21736) | [헌내기는 친구가 필요해](docs/baekjoon/problems/21736.md) | SILVER 2 | BFS, DFS | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/21736.cpp) | 2026-01-09 |
| [1753](https://www.acmicpc.net/problem/1753) | [최단 경로](docs/baekjoon/problems/1753.md) | GOLD 4 | Dijkstra, Graph | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/1753.cpp) | 2026-01-08 |
<!-- AUTO-GENERATED:END -->
