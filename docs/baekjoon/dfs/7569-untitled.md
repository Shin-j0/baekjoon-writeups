---
title: "토마토"
boj: 7569
tier: "GOLD 5"
algorithms: "BFS,DFS"
date: "2025-12-28"
---

[https://www.acmicpc.net/problem/7569](https://www.acmicpc.net/problem/7569)


## 문제


철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자모양 상자의 칸에 하나씩 넣은 다음, 상자들을 수직으로 쌓아 올려서 창고에 보관한다.


![Screen%20Shot%202021-06-22%20at%202.49.11%20PM.png](https://u.acmicpc.net/c3f3343d-c291-40a9-9fe3-59f792a8cae9/Screen%20Shot%202021-06-22%20at%202.49.11%20PM.png)


창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토에 인접한 곳은 위, 아래, 왼쪽, 오른쪽, 앞, 뒤 여섯 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지 그 최소 일수를 알고 싶어 한다.


토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.


## 입력


첫 줄에는 상자의 크기를 나타내는 두 정수 M,N과 쌓아올려지는 상자의 수를 나타내는 H가 주어진다. M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M ≤ 100, 2 ≤ N ≤ 100, 1 ≤ H ≤ 100 이다. 둘째 줄부터는 가장 밑의 상자부터 가장 위의 상자까지에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 하나의 상자에 담긴 토마토의 정보가 주어진다. 각 줄에는 상자 가로줄에 들어있는 토마토들의 상태가 M개의 정수로 주어진다. 정수 1은 익은 토마토, 정수 0 은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다. 이러한 N개의 줄이 H번 반복하여 주어진다.


토마토가 하나 이상 있는 경우만 입력으로 주어진다.


## 출력


여러분은 토마토가 모두 익을 때까지 최소 며칠이 걸리는지를 계산해서 출력해야 한다. 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.


## 예제 입력 


```plain text
5 3 2
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 1 0 0
0 0 0 0 0
```


## 예제 출력 


```plain text
4
```


## 해결 방법


주어진 3 차원 상자를 인접 리스트에 넣어 그래프로 구현하고 1인 지점을 모두 que에 push하고 


모든 인접 상자를 탐색 하였다면 마지막으로 0인 상자가 있는지 확인하여 결과를 출력하면 된다.


상자를 탐색 할 때 현재 상자의 값 +1 의 값을 저장하여 시작 상자와의 거리를 체크한 후 최대 값을 출력한다.


    → 최대 값은 토마토가 익는 최소 일수를 뜻한다.


7579번 토마토 문제에서 층이 추가된 것으로 그리 어렵지 않다.


## 알고리즘

1. 주어진 3 차원 상자들을 vector에 삽입하고 그 과정에서 1인 상자를 모두 que에 넣는다.
2. que가 공백 상태일 때까지 탐색을 반복한다.
    1. 현재 상자에서 동서남북 즉. 위 아래를 제외한 인접 상자를 모두 탐색한다.
    2. 만약 상자가 0이면 현재 상자의 값 +1 을 해서 저장하고 que에 넣는다.
    3. 위 아래 상자를 탐색하여 0이면 같은 방법으로 값을 저장하고 que에 넣는다.
3. 0이 있는 상자를 탐색하고 없으면 값이 가장 큰 상자를 출력한다.

## 코드


```c++
#include<iostream>
#include<vector>
#include<queue>
#include<algorithm>
using namespace std;
int di[] = {1,0,-1,0};
int dj[] = {0,1,0,-1};
int dk[] = {1,-1};
int n,m,f;

class position{
public:
	int i,j,k;
	position(int i,int j,int k):i(i),j(j),k(k){}
};


int main(){
	vector<vector<vector<int>>> graph;
	queue<position> que;
	int x,y,z;
	cin >> x >> y >> z;
	graph.assign(z, vector<vector<int>>(y, vector<int>(x)));
	for(int i=0; i<z;++i){
		for(int j=0; j<y; ++j){
			for(int k=0; k<x; ++k){
				cin>>graph[i][j][k];
				if(graph[i][j][k]==1)
					que.push(position(i,j,k));
			}
		}
	}
	int count = 0;
	while(!que.empty()){
		position cur = que.front();
		que.pop();
		for(int i=0; i<4; ++i){
			int nk = cur.k + di[i];
			int nj = cur.j + dj[i];
			if(nk<0 || nk>=x ||nj<0 || nj>=y ) continue;
			if(graph[cur.i][nj][nk]!=0) continue;
			graph[cur.i][nj][nk] = graph[cur.i][cur.j][cur.k]+1;
			que.push(position(cur.i,nj,nk));
		}
		for(int i=0; i<2; ++i){
			int ni = cur.i + dk[i];
			if(ni<0||ni>=z) continue;
			if(graph[ni][cur.j][cur.k]!=0) continue;
			graph[ni][cur.j][cur.k] = graph[cur.i][cur.j][cur.k]+1;
			que.push(position(ni,cur.j,cur.k));
		}

	}
	int max = 0;
	for(int i=0; i<z;++i){
		for(int j=0; j<y; ++j){
			for(int k=0; k<x; ++k){
				if(!graph[i][j][k]){
					cout<<-1<<endl;
					return 0;
				}
				max = max<graph[i][j][k]? graph[i][j][k]:max;
			}
		}
	}
	cout << max-1 <<endl;
}
```


