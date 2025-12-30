---
title: "회의실 배정"
boj: 1931
tier: "GOLD 5"
algorithms: "Greedy"
date: "2025-12-27"
---

## 문제


한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 I에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의가 겹치지 않게 하면서 회의실을 사용할 수 있는 회의의 최대 개수를 찾아보자. 단, 회의는 한번 시작하면 중간에 중단될 수 없으며 한 회의가 끝나는 것과 동시에 다음 회의가 시작될 수 있다. 회의의 시작시간과 끝나는 시간이 같을 수도 있다. 이 경우에는 시작하자마자 끝나는 것으로 생각하면 된다.


## 입력


첫째 줄에 회의의 수 N(1 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 N+1 줄까지 각 회의의 정보가 주어지는데 이것은 공백을 사이에 두고 회의의 시작시간과 끝나는 시간이 주어진다. 시작 시간과 끝나는 시간은 231-1보다 작거나 같은 자연수 또는 0이다.


## 출력


첫째 줄에 최대 사용할 수 있는 회의의 최대 개수를 출력한다.


## 해결 방법


vector를 사용하여 순차적으로 삽입


sort 알고리즘을 사용하여 정렬


이후 알맞은 원소들을 count한 후 출력 


그리디 알고리즘


→ 주어진 원소 중에서 가장 효율적인 선택을 하는 알고리즘


→ 최소 신장, 최단 거리 에서 사용


## 알고리즘

1. 주어진 시작 시간, 끝나는 시간을 vector에 저장
2. 시작 시간을 기준으로 오름차순 정렬

    기준(가장 큰 시작시간) 차례대로 다음 원소의 끝나는 시간과 비교

3. 조건에 맞는 원소가 있다면 기준을 해당 원소의 끝나는 시간으로 변경

## 코드


```c++
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
#include <map>

using namespace std;

class Time{
public:
	int start;
	int end;
	int dif;
};
int compare1(Time t1, Time t2){
	return t1.end>t2.end;
}

int compare2(Time t1, Time t2){
	return t1.start>t2.start;
}

int main(){

	int num;
	cin >> num;
	vector<Time> vec;
	Time temp;
	int start, count = 1;
	for(int i = 0; i<num; ++i){
		cin >> temp.start >>temp.end;
		temp.dif = temp.end - temp.start;
		vec.push_back(temp);
	}
	sort(vec.begin(),vec.end(),compare1);
	sort(vec.begin(),vec.end(),compare2);

	start=vec[0].start;
	for(int i = 1; i<num; ++i){
		if(start >= vec[i].end){
			start = vec[i].start;
			count++;
		}
	}
	cout << count <<endl;


}
```


