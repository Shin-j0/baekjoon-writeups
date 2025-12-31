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

## 👤 Author

- Name: 박신조
- Major: Computer Engineering
- GitHub: https://github.com/Shin-j0
- Baekjoon: https://www.acmicpc.net/user/psjo1207

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
- Total published: **15**

### By Tier
| Tier | Count |
|---|---:|
| GOLD 4 | 1 |
| GOLD 5 | 5 |
| SILVER 1 | 5 |
| SILVER 2 | 3 |
| SILVER 3 | 1 |

### By Algorithm
| Algorithm | Count |
|---|---:|
| DFS | 7 |
| BFS | 7 |
| Priority Queue | 3 |
| Heap | 2 |
| Que | 1 |
| Deque | 1 |
| Map | 1 |
| Divide and Conquer | 1 |
| Binary Search | 1 |
| DP | 1 |
| Greedy | 1 |

## Latest (Top 10)
| BOJ | Write-up | Tier | Algorithms | Code | Date |
|---:|---|---|---|---|---|
| [11729](https://www.acmicpc.net/problem/11729) | [절대값 힙](docs/baekjoon/problems/11729.md) | SILVER 1 | Heap, Priority Queue | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/11729.cpp) | 2025-12-30 |
| [10026](https://www.acmicpc.net/problem/10026) | [적록색약](docs/baekjoon/problems/10026.md) | GOLD 5 | BFS, DFS | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/10026.cpp) | 2025-12-30 |
| [11279](https://www.acmicpc.net/problem/11279) | [최대 힙](docs/baekjoon/problems/11279.md) | SILVER 2 | Heap, Priority Queue | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/11279.cpp) | 2025-12-29 |
| [7662](https://www.acmicpc.net/problem/7662) | [이중 우선순위 큐](docs/baekjoon/problems/7662.md) | GOLD 4 | Priority Queue, Map | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/7662.cpp) | 2025-12-28 |
| [7576](https://www.acmicpc.net/problem/7576) | [토마토](docs/baekjoon/problems/7576.md) | GOLD 5 | BFS, DFS | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/7576.cpp) | 2025-12-28 |
| [7569](https://www.acmicpc.net/problem/7569) | [토마토](docs/baekjoon/problems/7569.md) | GOLD 5 | BFS, DFS | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/7569.cpp) | 2025-12-28 |
| [5430](https://www.acmicpc.net/problem/5430) | [AC](docs/baekjoon/problems/5430.md) | GOLD 5 | Que, Deque | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/5430.cpp) | 2025-12-27 |
| [14940](https://www.acmicpc.net/problem/14940) | [쉬운 최단 거리](docs/baekjoon/problems/14940.md) | SILVER 1 | DFS, BFS | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/14940.cpp) | 2025-12-27 |
| [1931](https://www.acmicpc.net/problem/1931) | [회의실 배정](docs/baekjoon/problems/1931.md) | GOLD 5 | Greedy | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/1931.cpp) | 2025-12-27 |
| [2667](https://www.acmicpc.net/problem/2667) | [단지번호붙이기](docs/baekjoon/problems/2667.md) | SILVER 1 | DFS, BFS | [code](https://github.com/Shin-j0/baekjoon-solutions/blob/main/cpp/src/2667.cpp) | 2025-12-26 |
<!-- AUTO-GENERATED:END -->
