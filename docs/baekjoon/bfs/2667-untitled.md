---
title: "단지번호붙이기"
boj: 2667
tier: "SILVER 1"
algorithms: "DFS,BFS"
date: "2025-12-26"
---

## 문제


<그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다. <그림 2>는 <그림 1>을 단지별로 번호를 붙인 것이다. 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6dab810-ded1-4828-bfb2-eef9b115ca70/21174c9a-0a15-4226-998e-212808bbf66b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625C4F4VI%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T184038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6hfpfeToGQAyauaqD%2F4yw%2FtTnuUu13B1%2BUkvo7hZw8AIhAJ6798khQtIWB1jzs1c5DjA%2FXmknTEZ1L4zk1fy%2FLchJKogECLf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx9liz1qbpNETUD6lsq3AP9Cpq4inBF3ukUKfM48woXqM3l8dR8NYMW%2FPTPoZoP1kEgnDCXqDg6Kj6DxawRubx9%2FX3RCKyIV5jR6%2Fu7fMY%2FWuNBNI%2BtaepozFEvxC8%2FH6AACW0pN8c%2B9nUvrXgZczaeC8edFQEh2XZYkY4%2F3vJZZeU2tw1GHiMKA6xh0sHcpi1w5ibUcyuYTgqq6XB5LGM4BVExNXaoDz297ZOL3ArxDZxfNdCekBUZ1kq%2BWgh2apw%2BtJZPq4Oh5T99uyN1xhB75LOWBSNe2BL%2Fy6Sl59D4s8rB%2Fqa28bBARXTYTJnN7bX%2BEENjiLC25Xyy%2Fl3TTgokz7PjdxO2bl6Atptq6PA%2FgdQa369AS%2BnJcFze5MUPeUmjk9THnuguqToTxR19iVdUrEIEsFXAxGreAhstfZ9YOyHI%2BTPjpleLWf54Nh2vU1f571RkOgpzY4TJgwepaQYbUTp3us40IIZWZ4hyOtm%2Fj%2FHkxWgqRhv%2BXmjeOERtsba5vy0vW4NsJkfQFb7rIbtv2iwAvP55EALTCrpXpeWbmRa%2FmCo%2BrucoJgO%2BaBsr6ImSxhTU2gD5PZIjTXw74MBc2BLi6BCAhkMFwz%2FzCwmDf2qAqkqX14iMMXYlswopIm7qNXJyddG%2BqfVlXzCBtM%2FKBjqkAczANnKLS2KTCFqK507SgRK7F7qVIdpkqyBRhkRfdt84eihC7nq2J7lPWTA1oa8d3mlhhB9ygR1kYvkj280GIbpJpiPywaek0zPDy691zONbBqK0MHLWqEa81Veb5tcc0LAjuf9zNFmHNn9F5NwDD%2BYLFUCJDlM4g%2FsJkpESyxUqhDShcmBQPHRWcTCKGsCHwARMZnyLNjoWGqFFkYU0cqPouVaF&X-Amz-Signature=332c7859a8b00859e862bef06c1f4c0a483d87528feb1329e63d6797e80b8b1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 입력


첫 번째 줄에는 지도의 크기 N(정사각형이므로 가로와 세로의 크기는 같으며 5≤N≤25)이 입력되고, 그 다음 N줄에는 각각 N개의 자료(0혹은 1)가 입력된다.


## 출력


첫 번째 줄에는 총 단지수를 출력하시오. 그리고 각 단지내 집의 수를 오름차순으로 정렬하여 한 줄에 하나씩 출력하시오.


## 예제 입력 


```plain text
7
0110100
0110101
1110101
0000111
0100000
0111110
0111000
```


## 예제 출력 


```plain text
3
7
8
9
```


## 해결 방안


주어진 지도에서 1 이 모여 있는 구역을 단지라고 하고, 각 단지마다 집의 개수를 카운트 하여


총 몇 개의 단지가 있고 단지마다 몇 개의 집이 있는지 구하면 되는 간단한 탐색 문제이다.


이중 for 문을 통해 모든 지점을 탐색하여 1인 지점을 만나면 모두 bfs 로 탐색 후 0으로 변경해준다.


그리고 1의 개수를 카운트 하여 저장한다. 이 과정을 모든 지점이 0 이 될 때까지 반복한다.


## 알고리즘

1. 주어진 지도를 인접 리스트에 넣는다. 이때 문자열로 주어지기 때문에 쪼개서 넣어야한다.
2. 모든 지점을 탐색하고 1을 만나면 bfs()호출, 0이면 넘어간다.
    1. bfs호출 시 인접 1인 지점을 모두 0으로 변경하고 que에 넣는다.
    2. que에 값이 추가될 때마다 카운트를 한다.
    3. que가 공백 상태면 카운트 한 값을 vector 에 저장한다.
3. 모든 지점 탐색이 끝나면 최종 count 값과 단지 별 집의 개수를 출력한다.

## 코드


```c++
#include<iostream>
#include<vector>
#include<queue>
#include<algorithm>

using namespace std;
vector<vector<int>> graph;
vector<int> numHouse;

int di[] = {1,0,-1,0};
int dj[] = {0,1,0,-1};

class position{
public:
	int i,j;
	position(int i,int j):i(i),j(j){}
};

void bfs(int i, int j,int n){
	position start(i,j);
	queue<position> q;
	q.push(start);
	int cnt = 1;
	graph[i][j] = 0;
	while(!q.empty()){
		position cur = q.front();
		q.pop();
		for(int i=0; i<4; ++i){
			int ni,nj;
			ni = cur.i + di[i];
			nj = cur.j + dj[i];
			if(ni<0 || ni>=n || nj<0 || nj>=n) continue;
			if(graph[ni][nj]==0) continue;
			graph[ni][nj] = 0;
			cnt++;
			q.push(position(ni,nj));
		}
	}
	numHouse.push_back(cnt);
}

int main(){
	int n;
	cin >> n;
	graph.assign(n,vector<int>(n));
	for(int i = 0; i<n; ++i){
		string s;
		cin >> s;
		for(int j=0; j<n; ++j)
			graph[i][j] = s[j]-'0';
	}

	int count=0;
	for(int i=0; i<n; ++i){
		for(int j = 0; j<n; ++j){
			if(graph[i][j]==1){
				bfs(i,j,n);
				count++;
			}
		}
	}
	sort(numHouse.begin(), numHouse.end());
	cout<<count<<endl;
	for(int i=0 ;i<count; ++i)
		cout<<numHouse[i]<<endl;
}
```


