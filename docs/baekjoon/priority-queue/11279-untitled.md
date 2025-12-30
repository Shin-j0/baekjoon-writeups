---
title: "최대 힙"
boj: 11279
tier: "SILVER 2"
algorithms: "Heap,Priority Queue"
date: "2025-12-29"
---

## 문제


널리 잘 알려진 자료구조 중 최대 힙이 있다. 최대 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

1. 배열에 자연수 x를 넣는다.
2. 배열에서 가장 큰 값을 출력하고, 그 값을 배열에서 제거한다.

프로그램은 처음에 비어있는 배열에서 시작하게 된다.


## 입력


첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 큰 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 입력되는 자연수는 231보다 작다.


## 출력


입력에서 0이 주어진 횟수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 큰 값을 출력하라고 한 경우에는 0을 출력하면 된다.


## 예제 입력 


```plain text
13
0
1
2
0
0
3
2
1
0
0
0
0
0
```


## 예제 출력 


```plain text
0
2
1
3
2
1
0
0
```


## 해결 방안


c++ SLT 우선순위 큐 사용


**#include** <queue>


**#include** <functional>


priority_queue<**int**> pq;


해당 방법으로 최대 힙을 활용한 우선순위 큐를 사용할 수 있다.


## 알고리즘

1. 우선순위 max_que 를 호출 → 값을 넣을 때 마다 자료구조 최대 힙을 사용하여 자동으로 정렬
2. max_que의 top()을 통해 최대 값 추출, pop을 통해 que에서 제거

## 코드


```c++
#include<iostream>
#include<algorithm>
#include <queue>
#include <functional>

using namespace std;

priority_queue<int> pq;

int main(){
	int n;
	cin >> n;
	string sul = "";
	pq = priority_queue<int>();
	for(int i=0; i<n; ++i){
		int x;
		cin >> x;
		if(x==0){
			if(pq.empty()) sul+="0\n";
			else{
				sul+=to_string(pq.top())+"\n";
				pq.pop();
			}
		}
		else pq.push(x);
	}
	cout << sul<<endl;
}
```


