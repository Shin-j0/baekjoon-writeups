---
title: "미로 탐색"
boj: 2178
tier: "SILVER 1"
algorithms: "DFS,BFS"
date: "2025-12-25"
---

## 문제


N×M크기의 배열로 표현되는 미로가 있다.


| 1 | 0 | 1 | 1 | 1 | 1 |
| - | - | - | - | - | - |
| 1 | 0 | 1 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 0 | 1 | 1 |


미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.


위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.


## 입력


첫째 줄에 두 정수 N, M(2 ≤ N, M ≤ 100)이 주어진다. 다음 N개의 줄에는 M개의 정수로 미로가 주어진다. 각각의 수들은 **붙어서** 입력으로 주어진다.


## 출력


첫째 줄에 지나야 하는 최소의 칸 수를 출력한다. 항상 도착위치로 이동할 수 있는 경우만 입력으로 주어진다.


## 예제 입력 


```plain text
4 6
101111
101010
101011
111011
```


## 예제 출력 


```plain text
15
```


## 해결 방안


주어진 미로를 인접 리스트에 넣고 dfs방식으로 미로를 탐색한다.


한 칸 이동할 때 마다 1을 더하여 거리를 체크한다. 이 과정에서 방문할 좌표의 가중치가 


현재 가중치의 +1보다 크다면 현재 가중치의 +1로 변경하고 스택에 push한다.


일반 bfs탐색처럼 따로 방문 표시를 하는 게 아닌 가중치가 변경 될 때만  스택에 push하여 


무한으로 탐색 하는 것을 방지한다.


## 알고리즘

1. 주어지는 문자열 쪼개서 vector에 추가하여 미로를 구현한다.
2. 첫 시작 지점으로 stack에 담고 stack이 공백 상태가 될 때 까지 반복한다.
    1. stack에서 pop을 하여 현재 지점을 받아온다.
    2. 현재 지점 기준 인접한 4 방향을 모두 탐색하여 조건에 부합하면 stack에 추가한다.
3. 탐색이 모두 끝나면 최단 거리를 출력한다.

## 코드


```c++
#include <iostream>
#include <vector>
#include <stack>

using namespace std;
vector<vector<int>> graph;
vector<vector<int>> weight;
int di[] = {1,0,-1,0};
int dj[] = {0,1,0,-1};
class position{
public:
	int i,j;
	position(int i, int j): i(i), j(j) {}
};

int main(){
	int n,m;
	cin>>n>>m;
	graph.assign(n,vector<int>(m));
	weight.assign(n,vector<int>(m,1e9));

	for(int i=0; i<n; ++i){
		string s;
		cin >> s;
		for (int j = 0; j < m; ++j) graph[i][j] = s[j] - '0';

	}
	stack<position> stack;

	weight[0][0] = 1;
	stack.push(position(0,0));
	while(!stack.empty()){
		position cur = stack.top();
		stack.pop();

		for(int k=0;k<4;++k){
			int ni = cur.i + di[k];
			int nj = cur.j + dj[k];

			if(ni<0 || ni>=n || nj<0 || nj>=m) continue;
			if(graph[ni][nj] == 0) continue;

			if(weight[ni][nj] > weight[cur.i][cur.j] + 1){
				weight[ni][nj] = weight[cur.i][cur.j] + 1;
				stack.push(position(ni,nj));

			}
		}
	}
	cout << weight[n-1][m-1] << endl;
}
```


