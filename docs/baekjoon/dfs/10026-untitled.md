---
title: "적록색약"
boj: 10026
tier: "GOLD 5"
algorithms: "BFS,DFS"
date: "2025-12-30"
---

 [https://www.acmicpc.net/problem/10026](https://www.acmicpc.net/problem/10026)


## 문제


적록색약은 빨간색과 초록색의 차이를 거의 느끼지 못한다. 따라서, 적록색약인 사람이 보는 그림은 아닌 사람이 보는 그림과는 좀 다를 수 있다.


크기가 N×N인 그리드의 각 칸에 R(빨강), G(초록), B(파랑) 중 하나를 색칠한 그림이 있다. 그림은 몇 개의 구역으로 나뉘어져 있는데, 구역은 같은 색으로 이루어져 있다. 또, 같은 색상이 상하좌우로 인접해 있는 경우에 두 글자는 같은 구역에 속한다. (색상의 차이를 거의 느끼지 못하는 경우도 같은 색상이라 한다)


예를 들어, 그림이 아래와 같은 경우에


```plain text
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR
```


적록색약이 아닌 사람이 봤을 때 구역의 수는 총 4개이다. (빨강 2, 파랑 1, 초록 1) 하지만, 적록색약인 사람은 구역을 3개 볼 수 있다. (빨강-초록 2, 파랑 1)


그림이 입력으로 주어졌을 때, 적록색약인 사람이 봤을 때와 아닌 사람이 봤을 때 구역의 수를 구하는 프로그램을 작성하시오.


## 입력


첫째 줄에 N이 주어진다. (1 ≤ N ≤ 100)


둘째 줄부터 N개 줄에는 그림이 주어진다.


## 출력


적록색약이 아닌 사람이 봤을 때의 구역의 개수와 적록색약인 사람이 봤을 때의 구역의 수를 공백으로 구분해 출력한다.


## 예제 입력 1


```plain text
5
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR
```


## 예제 출력 1


```plain text
4 3
```


## 해결 방법


bfs(pair,que 사용), dfs(재귀, 전역변수 사용)


적록색약이 아닌 사람 = 모든 색을 각각 bfs, dfs탐색으로 카운팅


적록색약인 사람 = G→R로 변경하여 bfs, dfs탐색으로 카운팅


## 알고리즘

1. 주어진 구역들을 vector에 넣고 적록 색약인 사람은 G→R로 변경하여 저장.
2. 모든 구역을 탐색 실시 → bfs, dfs함수 호출할 때마다 카운팅
3. 결과 값 출력

## 코드


```c++
#include<iostream>
#include<queue>
#include<vector>

using namespace std;

vector<vector<char>> v1;
vector<vector<char>> v2;

int di[] = {1,0,-1,0};
int dj[] = {0,1,0,-1};

class position{
public:
	int i,j;
	position(int i,int j):i(i),j(j){}
};

void bfs_v1(int i, int j, int n,char x){
	queue<position> que;
	position start(i,j);
	que.push(start);
	v1[i][j]='0';
	while(!que.empty()){
		position cur = que.front();
		que.pop();
		for(int dir=0;dir<4; ++dir){
			int ni = cur.i + di[dir];
			int nj = cur.j + dj[dir];
			if(ni < 0 || ni >= n || nj<0||nj>=n) continue;
			if(v1[ni][nj]!=x)continue;
			v1[ni][nj] = '0';
			que.push(position(ni,nj));
		}
	}
}

void bfs_v2(int i, int j, int n,char x){
	queue<position> que;
	position start(i,j);
	que.push(start);
	v2[i][j]='0';
	while(!que.empty()){
		position cur = que.front();
		que.pop();
		for(int dir=0;dir<4; ++dir){
			int ni = cur.i + di[dir];
			int nj = cur.j + dj[dir];
			if(ni < 0 || ni >= n || nj<0 || nj >= n) continue;
			if(v2[ni][nj]!=x) continue;
			v2[ni][nj] = '0';
			que.push(position(ni,nj));
		}
	}
}

int main(){
	int n;
	cin >> n;
	v1.assign(n,vector<char>(n));
	v2.assign(n,vector<char>(n));
	for(int i=0;i<n;++i){
		string s;
		cin >> s;
		for(int j=0;j<n;++j){
			v1[i][j] = s[j];
			if(s[j]=='G')
				s[j]='R';
			v2[i][j] = s[j];
		}
	}
	int cnt1 = 0,cnt2 = 0;
	for(int i=0;i<n;++i){
		for(int j=0;j<n;++j){
			if(v1[i][j]!='0'){
				bfs_v1(i,j,n,v1[i][j]);
				cnt1++;
			}
			if(v2[i][j]!='0'){
				bfs_v2(i,j,n,v2[i][j]);
				cnt2++;
			}
		}
	}
	cout<<cnt1<<" "<<cnt2<<endl;
}
```


기존 class position → pair 사용하여 코드 간소화


pair<int,int> 두 변수를 하나의 변수로 취급


전역변수 v1, v2 → 매개변수로 변경, bfs함수 하나로 처리 가능


```c++
#include<iostream>
#include<queue>
#include<vector>

using namespace std;

int di[] = {1,0,-1,0};
int dj[] = {0,1,0,-1};

void bfs(vector<vector<char>>&v,int i, int j, int n,char x){
	queue<pair<int,int>> que;
	que.push({i,j});
	v[i][j]='0';
	while(!que.empty()){
		pair<int,int> cur = que.front();
		que.pop();
		for(int dir=0;dir<4; ++dir){
			int ni = cur.first + di[dir];
			int nj = cur.second + dj[dir];
			if(ni < 0 || ni >= n || nj<0 || nj >= n) continue;
			if(v[ni][nj]!=x) continue;
			v[ni][nj] = '0';
			que.push({ni,nj});
		}
	}
}

int main(){
	int n;
	cin >> n;
	vector<vector<char>> v1;
	vector<vector<char>> v2;
	v1.assign(n,vector<char>(n));
	v2.assign(n,vector<char>(n));

	for(int i=0;i<n;++i){
		string s;
		cin >> s;
		for(int j=0;j<n;++j){
			v1[i][j] = s[j];
			if(s[j]=='G')
				s[j]='R';
			v2[i][j] = s[j];
		}
	}
	int cnt1 = 0,cnt2 = 0;
	for(int i=0;i<n;++i){
		for(int j=0;j<n;++j){
			if(v1[i][j]!='0'){
				bfs(v1,i,j,n,v1[i][j]);
				cnt1++;
			}
			if(v2[i][j]!='0'){
				bfs(v2,i,j,n,v2[i][j]);
				cnt2++;
			}
		}
	}
	cout<<cnt1<<" "<<cnt2<<endl;

}
```


v1,v2 벡터의 원본 데이터는 보존하고 방문 처리 벡터 v 를 사용하여 처리


```c++
#include<iostream>
#include<algorithm>
#include<queue>
#include<vector>

using namespace std;

int di[] = {1,0,-1,0};
int dj[] = {0,1,0,-1};

int bfs(const vector<string>& g){
	int n = g.size();
	vector<vector<int>> v(n,vector<int>(n,0));
	int cnt = 0;
	for(int si=0;si<n;++si) for(int sj=0;sj<n;++sj){
		if(v[si][sj]) continue;
		queue<pair<int,int>> que;
		cnt++;
		que.push({si,sj});
		v[si][sj]=1;
		char color = g[si][sj];

		while(!que.empty()){
			pair<int,int> cur = que.front(); que.pop();
			for(int dir=0;dir<4; ++dir){
				int ni = cur.first + di[dir];
				int nj = cur.second + dj[dir];
				if(ni < 0 || ni >= n || nj<0 || nj >= n) continue;
				if(v[ni][nj] || g[ni][nj]!=color) continue;
				v[ni][nj] = 1;
				que.push({ni,nj});
			}
		}
	}
	return cnt;
}

int main(){
	int n;
	cin >> n;
	vector<string> v1(n);
	vector<string> v2(n);

	for(int i=0;i<n;++i){
		string s;
		cin >> s;
		v1[i] = s;
		v2[i] = v1[i];
		for(char &c:v2[i])
			if(c=='G') c ='R';
	}

	cout<<bfs(v1)<<" "<<bfs(v2)<<endl;

}
```


dfs로 풀어본 코드


```c++
#include<iostream>
#include<algorithm>
#include<queue>
#include<vector>

using namespace std;

int di[] = {1,0,-1,0};
int dj[] = {0,1,0,-1};

int n;
vector<string> g0,g1;
vector<vector<int>> visit;

void dfs(int i,int j,const vector<string>&g){
	visit[i][j] = 1;
	char color = g[i][j];
	for(int dir=0;dir<4;++dir){
		int ni = i + di[dir];
		int nj = j + dj[dir];
		if(ni < 0 || ni >= n || nj<0 || nj >= n) continue;
		if(visit[ni][nj] || g[ni][nj]!=color) continue;

		dfs(ni,nj,g);
	}
}

int countArea(const vector<string>&g){
	int cnt = 0;
	visit.assign(n,vector<int>(n,0));
	for(int i=0;i<n;++i) for(int j=0;j<n;++j){
			if(!visit[i][j]){
				cnt++;
				dfs(i, j, g);
			}
	}
	return cnt;
}

int main(){
	cin >> n;
	g0.assign(n,"");
	g1.assign(n,"");

	for(int i=0;i<n;++i){
		string s;
		cin >> s;
		g0[i] = s;
		g1[i] = g0[i];
		for(char &c:g1[i])
			if(c=='G') c ='R';
	}

	cout<<countArea(g0)<<" "<<countArea(g1)<<endl;

}
```


