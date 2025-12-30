---
title: "토마토"
boj: 7576
tier: "GOLD 5"
algorithms: "BFS,DFS"
date: "2025-12-28"
---

 [https://www.acmicpc.net/problem/7576](https://www.acmicpc.net/problem/7576)


## 문제


철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자 모양 상자의 칸에 하나 씩 넣어서 창고에 보관한다.


![Screen%20Shot%202021-06-22%20at%202.41.22%20PM.png](https://u.acmicpc.net/de29c64f-dee7-4fe0-afa9-afd6fc4aad3a/Screen%20Shot%202021-06-22%20at%202.41.22%20PM.png)


창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지, 그 최소 일수를 알고 싶어 한다.


토마토를 창고에 보관하는 격자 모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.


## 입력


첫 줄에는 상자의 크기를 나타내는 두 정수 M, N이 주어진다. M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M, N ≤ 1,000 이다. 둘째 줄부터는 하나의 상자에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 상자에 담긴 토마토의 정보가 주어진다. 하나의 줄에는 상자 가로 줄에 들어있는 토마토의 상태가 M개의 정수로 주어진다. 정수 1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.


토마토가 하나 이상 있는 경우만 입력으로 주어진다.


## 출력


여러분은 토마토가 모두 익을 때까지 의 최소 날짜를 출력해야 한다. 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.


## 예제 입력 1 


```plain text
6 4
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 1
```


## 예제 출력 1 


```plain text
8
```


## 해결 방법


STL 알고리즘 queue 를 활용,  BFS으로 너비 우선 탐색 실시 


너비 탐색 우선 : 탐색 시작 지점과 가까운 자료들을 우선 탐색


## 알고리즘

1. 익은 토마토의 좌표를 큐1에 삽입
2. 큐 1 의 원소 pop 후 해당 좌표 주변의 토마토를 익은 토마토로 변경 후 다시 큐2에 삽입
3. 큐 2를 큐 1에 저장
4. 모든 토마토를 탐색 완료했다면 종료

![KakaoTalk_20250707_205652425.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6dab810-ded1-4828-bfb2-eef9b115ca70/04b55dcf-7827-4fcf-9416-e8d562092a1d/KakaoTalk_20250707_205652425.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEN6OQEU%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T184046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDC4ygizwG58KF0DsDDSaQMnO4PnGC6SJi4TW%2FPsahRyQIhAO%2BMdY4XxOBPI3IW39himVjPWhb%2FU5Vdt9iU4QpeSgo8KogECLf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxruBGraGDmZtNupRUq3APJM7U2la9KRVVHzmcjLdlZSktEc0tGy%2B8x4JKsTKovq9%2F0L5XChTGQKB%2Bsdpuwizb8BHZIdq7S4zAJtqdQx7vzIrci4wwSBdPelD3S4fJTv074g0z7qT4nBOHviFSK9H%2Bk6Zrp5m7U7bLA9HYWi0mV00vZVDKjiMRQCZvHVnSPu2wzVr06yQVCHvqkwEnUHXwA8PEpckx953z6vivaU%2F6qtfuNLH0EAihHb%2Fl3gpL1gye06%2Bi4hwkevYDna11ExYWpSCLpdLYI4E4J%2F4AKBwnfAor2yG9%2B6srwmdq3lvH4BMSfJS4wqrDFZlfnc0LO7k4MOMHri4W1StixkHevPZJ6bB2s1XBv5vTHHwjJvjEgnGIzViRxVSbGL6T5z82NpRepQY3X6RAZ%2FYmJpN0eAg0HMqHTzt4pbGF%2BAHK4MJhhH3t%2FRsjZ1enbM1N9QnYRlfedD%2BeERfPYSpFOANEPRQceIDU5%2FL0AfF6iuqa%2FjYdpis6mTOtjSNmI7PdlsjQ5Ii85fUXOjQPGnGbCqZwra8MHxG4vVsmhF4Zg9SDfeYuyqOsNySaF7hhNRnmqUp4DBhAXU%2FBWFtiiHn0%2FmFhOXVaqY8YaLUsxES9aygVgqgDPSTmBZQ8zae5oZYowoTDFs8%2FKBjqkAVXVywtgrdVgznbacGdUN0XCvw9B7KMPwReG%2BXQb1r5oooimwwdkpCVTQ99azMa3QYBGfr%2Bahk36C0k7z2lX2S7qp4CsWacZusJ8toxm0jii4JQtkt8Tp6vGjF4VX3%2Bn0X67M7A%2BW3P0150W7jBkf%2FnyMpsAQGMmpNV2rxcyrYSFcF2fQPPKRrLfc3dL19du0y9DgIwQ4nSaSzn7FuFgdpoFdFAq&X-Amz-Signature=007791ff3d64b5ffd0be380dd46fa1f9fa300d88cc86a9edb786c68cf86abd31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
		cout << "( " << x << ", "<< y << ")" << endl;
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

	cin >> width >> length;
	Array = new int*[length];
	for(int i=0; i<length; ++i)
	    Array[i] = new int[width];

	int max_count = width * length, count = 0;
	int result = 0;

	for(int y = 0; y<length; ++y){
		for(int x = 0; x<width; ++x){
			cin >> value;
			Array[y][x] = value;
			if(value==0) continue;
			if(value==1){
				temp.set(x,y);
				que1.push(temp);
			}
			max_count--;
		}
	}

	while(max_count > count){
		if(que1.empty()){
			cout << -1 << endl;
			return 0;
		}
		//cout << max_count << " " << count << endl;
		result ++;
		while(!que1.empty()){
			temp = que1.front();
			//temp.Print();

			for(int i=0;i<4;++i){
				temp_arr[i].set(temp.x + index[i][0],temp.y + index[i][1]);
				//temp_arr[i].Print();
				if(check_index(temp_arr[i]) && Array[temp_arr[i].y][temp_arr[i].x] == 0) {
					Array[temp_arr[i].y][temp_arr[i].x] = 1;
					count ++;
					que2.push(temp_arr[i]);
				}
			}

			que1.pop();
		}
		que1 = que2;
		while(!que2.empty())
			que2.pop();
	}
	cout << result << endl;

}
```


