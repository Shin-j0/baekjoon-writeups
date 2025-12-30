---
title: "단지번호붙이기"
boj: 2667
tier: "SILVER 1"
algorithms: "DFS,BFS"
date: "2025-12-26"
---

## 문제


<그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다. <그림 2>는 <그림 1>을 단지별로 번호를 붙인 것이다. 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6dab810-ded1-4828-bfb2-eef9b115ca70/21174c9a-0a15-4226-998e-212808bbf66b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NHHT457%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T183919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE3s3rdLooWlkQHYAtbUevCg5BnjY1agYrBj1p1tm1gWAiBmMrbhpXE74HtK3hHRLbWlfNeZvSRb5qJlv5lB9vKRgCqIBAi3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvD51Z%2F%2F97Ae4m%2FBbKtwD9jDwlRYqJi2vtoMXzXg%2FJgy4nHdbS9%2FjQzhgaeQSzZpErq7RwO%2FRJSGOpcJkK1MzcWB8wMAh0HdN9bgG5YjVCpSDt7UwSjmBVqSvLxE9du%2FRrGeDI2YiHXQtObEJ0%2BnCm76BqSUjUnImx56la5e7lwX2XkvHXUujEHsNwE31S3KxxA6o8O4s37FqQfLoYSGsnSu50PjdDgtq5su5cVz1bCAEKj9O9gsSrB9Szlgn9ybJ0ZiuYw2B7bAHlFGuuNQNWTUEqctK%2FVTYy0J3uUDGpAUcgI3OdQ5Slm0T%2F5erxbXWQ6XPMLJOCX7UHzPK21AaXWr4LT9SksygPglIUWlNV6dtSbTCZXKnihuZvQ%2FZil7DlEkrLuIxJ3kr1rnHjHk1i29ed20%2Bmh8pRbhp5D8b6vtoxhYxX8fy4plNW1YLLwxwkf%2F2Icj18AdEmIOy%2BEm0VdA6zUI625qK6mMX6tX%2B7zeGosPjYYMALseM7e74ncIej2fo9y6v2a%2FJaZ6A%2F94v6e0fbUwucLTl7fX1O98wqUwWJLB%2BSvFZ9TJpk3Llk7ylkwe%2B%2Bd6QQXkgj6H2T%2B1BSxBPK2qtlwWs42Qt1IzYaW%2FwXCfP6Rmqxx%2FMfVtQ0yjqrK93dbQVXxWADUEw37PPygY6pgHoZz9cC5rM2bt6uuOPU%2BAxDk8J%2B5%2B%2FfUV6ghJB44ZdetRMppt1p%2F%2BaX%2FyoSbK8MvJGQh0IFQGk%2F9k6kQv%2Fel0dJHYXI%2BXpHVl6w2r69BSf4aan0KYU2hbWInEmSRYSgdWQlDP2Udl5JbRaM9C532S%2FbRWnNKXmbe4hu3sS3Mlj2PYXeUPNHmudZao2J%2FX9Bvb45oerypTNq2RFfdwdeXshZuLX45Zh&X-Amz-Signature=adca8016cb662d0c25871b151d1741d273255922b7ea4eec0a440cb277fc4e6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


