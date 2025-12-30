---
title: "절대값 힙"
boj: 11729
tier: "SILVER 1"
algorithms: "Heap,Priority Queue"
date: "2025-12-30"
---

[https://www.acmicpc.net/problem/11286](https://www.acmicpc.net/problem/11286)


## 문제


절댓값 힙은 다음과 같은 연산을 지원하는 자료구조이다.

1. 배열에 정수 x (x ≠ 0)를 넣는다.
2. 배열에서 절댓값이 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다. 절댓값이 가장 작은 값이 여러개일 때는, 가장 작은 수를 출력하고, 그 값을 배열에서 제거한다.

프로그램은 처음에 비어있는 배열에서 시작하게 된다.


## 입력


첫째 줄에 연산의 개수 N(1≤N≤100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 0이 아니라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 절댓값이 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 입력되는 정수는 -231보다 크고, 231보다 작다.


## 출력


입력에서 0이 주어진 회수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 절댓값이 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.


## 예제 입력 1


```plain text
18
1
-1
0
0
0
1
1
-1
-1
2
-2
0
0
0
0
0
0
0
```


## 예제 출력 1


```plain text
-1
1
0
-1
-1
1
1
-2
2
0
```


## 해결 방안


c++ SLT 우선순위 큐 사용


타입을 pair<절대 값, 원본 값>으로 지정하여 first 값으로 최소 힙 정렬, second 값으로 출력


## 알고리즘

1. 우선순위 min_que 를 호출 → 값을 넣을 때 마다 자료구조 최소 힙을 사용하여 자동으로 정렬
2. min_que의 top()을 통해 최대 값 추출, pop을 통해 que에서 제거

## 코드


```c++
#include<iostream>
#include<algorithm>
#include <queue>
#include <functional>

using namespace std;

int main(){
	int n;
	cin >> n;
	string sul = "";

	priority_queue<
	    pair<int,int>,
	    vector<pair<int,int>>,
	    greater<pair<int,int>>
	> pq;

	for(int i=0; i<n; ++i){
		int x;
		cin >> x;
		if(x==0){
			if(pq.empty()) sul+="0\n";
			else{
				sul+=to_string(pq.top().second)+"\n";
				pq.pop();
			}
		}
		else {
			if(x<0)
				pq.push({x*-1,x});
			else pq.push({x,x});
		}
	}
	cout << sul<<endl;
}
```


