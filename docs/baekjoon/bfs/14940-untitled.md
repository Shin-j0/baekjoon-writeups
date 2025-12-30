---
title: "쉬운 최단 거리"
boj: 14940
tier: "SILVER 1"
algorithms: "DFS,BFS"
date: "2025-12-27"
---

## 문제


지도가 주어지면 모든 지점에 대해서 목표 지점까지의 거리를 구하여라.


문제를 쉽게 만들기 위해 오직 가로와 세로로만 움직일 수 있다고 하자.


## 입력


지도의 크기 n과 m이 주어진다. n은 세로의 크기, m은 가로의 크기다.(2 ≤ n ≤ 1000, 2 ≤ m ≤ 1000)


다음 n개의 줄에 m개의 숫자가 주어진다. 0은 갈 수 없는 땅이고 1은 갈 수 있는 땅, 2는 목표 지점이다. 입력에서 2는 단 한 개이다.


## 출력


각 지점에서 목표 지점까지의 거리를 출력한다. 원래 갈 수 없는 땅인 위치는 0을 출력하고, 원래 갈 수 있는 땅인 부분 중에서 도달할 수 없는 위치는 -1을 출력한다.


## 예제 입력 


```plain text
2 3
1 0 0
2 0 1
```


## 예제 출력 


```plain text
1 0 0
0 0 -1
```


## 해결 방안


BFS와 큐를 사용하여 최단 거리 탐색


7576번 토마토 문제와 유사


## 알고리즘

1. 순차적으로 입력 받은 원소들을 저장 이때 케이스 별로 Array에 분류
2. 2를 입력 받으면 que에 저장
3. que가 공백 상태가 될 때까지 너비 우선 탐색 실시 → 큐가 공백 상태이면 모든 원소를 탐색 완료한 상태
4. 1차 탐색이 끝나면 시작 지점과의 거리를 1 증가

## 코드


```c++
#include<iostream>
#include<algorithm>
#include<queue>

using namespace std;
class spot{
public:
	int x,y;
	spot(): x{x}, y{y}{}
	spot(const spot & s){
		x = s.x;
		y = s.y;
	}
	void set(int x,int y){
		this->x = x;
		this->y = y;
	}
	void Print(){
		cout << "( "<<x<<", "<< y<<")"<<endl;
	}
};
int **Array;
int width,length;

bool check_index(spot index){
	if((index.x >= 0 && index.x < width) && (index.y >= 0 && index.y < length))
		return 1;
	return 0;
}


int main(void){
	queue<spot> que1;
	queue<spot> que2;
	spot temp, temp_arr[4];
	int index[4][2] = { {1,0},{-1,0},{0,1},{0,-1} };


	int value;

	cin >> length >> width;
	Array = new int*[length];
	for(int i=0; i<length; ++i){
	    Array[i] = new int[width];
	}

	int result = 0;

	for(int y = 0; y<length; ++y){
		for(int x = 0; x<width; ++x){
			cin >> value;
			Array[y][x] = value;
			if(value==0) {
				Array[y][x] = 0;
			}
			else if(value==2){
				temp.set(x,y);
				Array[y][x] = 0;
				que1.push(temp);
			}
			else{
				Array[y][x] = -1;
			}
		}
	}

	while(!que1.empty()){
		result ++;
		while(!que1.empty()){
			temp = que1.front();

			for(int i=0;i<4;++i){
				temp_arr[i].set(temp.x + index[i][0],temp.y + index[i][1]);

				if(check_index(temp_arr[i])){
					if(Array[temp_arr[i].y][temp_arr[i].x] != -1) continue;
					Array[temp_arr[i].y][temp_arr[i].x] = result;
					que2.push(temp_arr[i]);
				}
			}

			que1.pop();
		}
		que1 = que2;
		while(!que2.empty())
			que2.pop();
	}
	for(int y = 0; y<length; ++y){
		for(int x = 0; x<width; ++x)
			cout<<Array[y][x]<< " ";
		cout << endl;
	}
}
```


