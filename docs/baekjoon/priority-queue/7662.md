---
title: "이중 우선순위 큐"
boj: 7662
tier: "GOLD 4"
algorithms: "Priority Queue"
date: "2025-12-28"
---

[https://www.acmicpc.net/problem/7662](https://www.acmicpc.net/problem/7662)


## 문제


이중 우선순위 큐(dual priority queue)는 전형적인 우선순위 큐처럼 데이터를 삽입, 삭제할 수 있는 자료 구조이다. 전형적인 큐와의 차이점은 데이터를 삭제할 때 연산(operation) 명령에 따라 우선순위가 가장 높은 데이터 또는 가장 낮은 데이터 중 하나를 삭제하는 점이다. 이중 우선순위 큐를 위해선 두 가지 연산이 사용되는데, 하나는 데이터를 삽입하는 연산이고 다른 하나는 데이터를 삭제하는 연산이다. 데이터를 삭제하는 연산은 또 두 가지로 구분되는데 하나는 우선순위가 가장 높은 것을 삭제하기 위한 것이고 다른 하나는 우선순위가 가장 낮은 것을 삭제하기 위한 것이다.


정수만 저장하는 이중 우선순위 큐 Q가 있다고 가정하자. Q에 저장된 각 정수의 값 자체를 우선순위라고 간주하자.


Q에 적용될 일련의 연산이 주어질 때 이를 처리한 후 최종적으로 Q에 저장된 데이터 중 최댓값과 최솟값을 출력하는 프로그램을 작성하라.


## 입력


입력 데이터는 표준입력을 사용한다. 입력은 T개의 테스트 데이터로 구성된다. 입력의 첫 번째 줄에는 입력 데이터의 수를 나타내는 정수 T가 주어진다. 각 테스트 데이터의 첫째 줄에는 Q에 적용할 연산의 개수를 나타내는 정수 k (k ≤ 1,000,000)가 주어진다. 이어지는 k 줄 각각엔 연산을 나타내는 문자(‘D’ 또는 ‘I’)와 정수 n이 주어진다. ‘I n’은 정수 n을 Q에 삽입하는 연산을 의미한다. 동일한 정수가 삽입될 수 있음을 참고하기 바란다. ‘D 1’는 Q에서 최댓값을 삭제하는 연산을 의미하며, ‘D -1’는 Q 에서 최솟값을 삭제하는 연산을 의미한다. 최댓값(최솟값)을 삭제하는 연산에서 최댓값(최솟값)이 둘 이상인 경우, 하나만 삭제됨을 유념하기 바란다.


만약 Q가 비어있는데 적용할 연산이 ‘D’라면 이 연산은 무시해도 좋다. Q에 저장될 모든 정수는 -231 이상 231 미만인 정수이다.


## 출력


출력은 표준출력을 사용한다. 각 테스트 데이터에 대해, 모든 연산을 처리한 후 Q에 남아 있는 값 중 최댓값과 최솟값을 출력하라. 두 값은 한 줄에 출력하되 하나의 공백으로 구분하라. 만약 Q가 비어있다면 ‘EMPTY’를 출력하라.


## 예제 입력 


```plain text
2
7
I 16
I -5643
D -1
D 1
D 1
I 123
D -1
9
I -45
I 653
D 1
I -642
I 45
I 97
D 1
D -1
I 333
```


## 예제 출력 


```plain text
EMPTY
333 -45
```


## 해결 방법


우선순위 큐 사용, map을 통한 max_que, min_que 카운팅


I 입력 시  que에 값 추가. D 입력 시 최대 값, 최소 값 출력


deque 사용 시 정렬하는 부분에서 시간 초과 발생. → priority_queue 를 사용 


## 알고리즘

1. I N 입력 시 min_que, max_que에 모두 (N)값 추가.
2. D -1 입력 시 min_que 에서 pop, D 1 입력 시 max_que 에서 pop
3. 양쪽 큐의 요소를 맞춰주기 위해 map을 사용 → 값 입력 시 map[x] = 1로 지정
4. 양쪽 큐에서 map[x] = 0 인 부분 큐에서 제거. → 0은 한쪽 큐에서 값이 pop 되었음을 의미.
5. 입력이 모두 끝난 후 양쪽 큐를 한번 더 맞춰줌.

## 코드


```c++
#include<iostream>
#include<algorithm>
#include <queue>
#include <functional>
#include <unordered_map>

using namespace std;

priority_queue<int> q1;                            //max_que
priority_queue<int, vector<int>, greater<int>> q2; //min_que
unordered_map<int,int> cnt;

int main(){
	int n;
	cin >> n;
	for(int i=0; i<n; ++i){
		q1 = priority_queue<int>();
		q2 = priority_queue<int, vector<int>, greater<int>>();
		cnt.clear();
		
		int m, count=0;
		cin >> m;

		for(int j=0; j<m; ++j){

			char s;
			int x;
			cin >> s >> x;
			switch(s){
				case 'I':
					cnt[x]++;
					q1.push(x);
					q2.push(x);
					count ++;
					break;
				case 'D':
					if(count==0) continue;
					if(q1.empty() || q2.empty()) continue;
					if(x==1){
						while(!q1.empty()&&cnt[q1.top()]==0) q1.pop();
						if(q1.empty() || q2.empty()) continue;
						cnt[q1.top()]--;
						q1.pop();
					}
					else{
						while(!q2.empty()&&cnt[q2.top()]==0) q2.pop();
						if(q1.empty() || q2.empty()) continue;
						cnt[q2.top()]--;
						q2.pop();
					}
					count--;
					break;
			}
		}
		while(!q1.empty()&&cnt[q1.top()]==0) q1.pop();
		while(!q2.empty()&&cnt[q2.top()]==0) q2.pop();
		if(q1.empty() || q2.empty()) cout<<"EMPTY"<<endl;
		else cout<<q1.top()<<" "<<q2.top()<<endl;
	}
}
```


