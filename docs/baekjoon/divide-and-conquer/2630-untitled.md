---
title: "색종이 만들기"
boj: 2630
tier: "SILVER 2"
algorithms: "Divide and Conquer"
date: "2025-12-23"
---

## 문제


아래 <그림 1>과 같이 여러개의 정사각형칸들로 이루어진 정사각형 모양의 종이가 주어져 있고, 각 정사각형들은 하얀색으로 칠해져 있거나 파란색으로 칠해져 있다. 주어진 종이를 일정한 규칙에 따라 잘라서 다양한 크기를 가진 정사각형 모양의 하얀색 또는 파란색 색종이를 만들려고 한다.


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6dab810-ded1-4828-bfb2-eef9b115ca70/81d12b72-1f9b-441e-851e-a7cca75cd0c4/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TYGWE4E%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T183924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGxOnro%2FIBgqJ6JC8EQ0%2BTCcYeBFcFvdHpbJ18KMC7NTAiEAsKSPb0dMGGTMnvJ7ZPbcuGV2rvGC8tyFF2WP7logs2MqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIkubbbr4JYDuC7kUSrcA0DLB9jri7xqjo0nXa%2B0V9RY35IeK4l%2BSV9AfXqPUPSWGM7wJg8aDYP2KfKse9zLLODn3UrONWiqmUOgRsE7%2F4II6d9xDkb%2BoQTQUGDBXxvzf6ur5vxNw4qu5iqyGCAROFs7xLqyzDZrGPON546yCLWDlmLgsjqphCse8t%2FAqWFM1I1aRW12CcDucjBExwbwR7ylMpRDMkKxqdEcX1n4XwFYHzMb6DwHgw2Xw9%2BnQpGYgU1UPd4jSzi7f%2FlJY7bOD4QV4HqgCGFbyzvgGYb9KgbB5NUMAOIqhIKUvsJGNCklHCiyag8Qy1Lt3CkJ74Gn1OT%2BGpj%2FHLb3Hya62wL2hSpxYT3OoXtvnC1tBYiWrNuOYLG6emw%2Fk3TKvBuBaP%2BynNJ%2FlpummhtRiMqpID9b7Umuf5WVLcaHKHSRE8XJwYjpa58LvpBt2ZHFhJAiABAB8XTMrRveodnaRP1lsg3ue7xS9QUKWX35%2FtH1h1fpWrFq5bioSqJJHpUPw%2FZfweiZAg2F0UiFtXhwiz%2BrTw4esAbTPluvUj2ai%2F6JLRg%2F7jxIS69Kovpr9qdNsXBpApubcLhZ0SqFrtmWS4MEmuOcow95oUn1QiXFl4yPWK1HHHj%2FfnCwvDBfAHs8eQKiMOizz8oGOqUBKfJfwxIptw7gJzLICKhvwypYF3XKhkiRLjiFiEMZL0wHoB2ksPGBrDjsVaadi%2FgvEnC6QqS55cgKqOCXUvX3dhFrsebm98%2F9cv3neG1nMkcZED%2Bl2ESL4hIHQrl%2FXCnNYzxdN1mnkj3nlSu9ruqjbj8LOU7C0hvPQF5euMKcg5V67ICnRn1%2FFg1e%2BW5yNziAzkslpJVG4GazEZtIvQJa5ZLdOBC1&X-Amz-Signature=163ed21822d5217bfc0c5ef4c004aa3dcdbc8c71a4df9e00c26cae85b1b5170a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


전체 종이의 크기가 N×N(N=2k, k는 1 이상 7 이하의 자연수) 이라면 종이를 자르는 규칙은 다음과 같다.


전체 종이가 모두 같은 색으로 칠해져 있지 않으면 가로와 세로로 중간 부분을 잘라서 <그림 2>의 I, II, III, IV와 같이 똑같은 크기의 네 개의 N/2 × N/2색종이로 나눈다. 나누어진 종이 I, II, III, IV 각각에 대해서도 앞에서와 마찬가지로 모두 같은 색으로 칠해져 있지 않으면 같은 방법으로 똑같은 크기의 네 개의 색종이로 나눈다. 이와 같은 과정을 잘라진 종이가 모두 하얀색 또는 모두 파란색으로 칠해져 있거나, 하나의 정사각형 칸이 되어 더 이상 자를 수 없을 때까지 반복한다.


위와 같은 규칙에 따라 잘랐을 때 <그림 3>은 <그림 1>의 종이를 처음 나눈 후의 상태를, <그림 4>는 두 번째 나눈 후의 상태를, <그림 5>는 최종적으로 만들어진 다양한 크기의 9장의 하얀색 색종이와 7장의 파란색 색종이를 보여주고 있다.


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6dab810-ded1-4828-bfb2-eef9b115ca70/98b118d8-40c8-4ee2-af47-12dd2cec925b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TYGWE4E%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T183924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGxOnro%2FIBgqJ6JC8EQ0%2BTCcYeBFcFvdHpbJ18KMC7NTAiEAsKSPb0dMGGTMnvJ7ZPbcuGV2rvGC8tyFF2WP7logs2MqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIkubbbr4JYDuC7kUSrcA0DLB9jri7xqjo0nXa%2B0V9RY35IeK4l%2BSV9AfXqPUPSWGM7wJg8aDYP2KfKse9zLLODn3UrONWiqmUOgRsE7%2F4II6d9xDkb%2BoQTQUGDBXxvzf6ur5vxNw4qu5iqyGCAROFs7xLqyzDZrGPON546yCLWDlmLgsjqphCse8t%2FAqWFM1I1aRW12CcDucjBExwbwR7ylMpRDMkKxqdEcX1n4XwFYHzMb6DwHgw2Xw9%2BnQpGYgU1UPd4jSzi7f%2FlJY7bOD4QV4HqgCGFbyzvgGYb9KgbB5NUMAOIqhIKUvsJGNCklHCiyag8Qy1Lt3CkJ74Gn1OT%2BGpj%2FHLb3Hya62wL2hSpxYT3OoXtvnC1tBYiWrNuOYLG6emw%2Fk3TKvBuBaP%2BynNJ%2FlpummhtRiMqpID9b7Umuf5WVLcaHKHSRE8XJwYjpa58LvpBt2ZHFhJAiABAB8XTMrRveodnaRP1lsg3ue7xS9QUKWX35%2FtH1h1fpWrFq5bioSqJJHpUPw%2FZfweiZAg2F0UiFtXhwiz%2BrTw4esAbTPluvUj2ai%2F6JLRg%2F7jxIS69Kovpr9qdNsXBpApubcLhZ0SqFrtmWS4MEmuOcow95oUn1QiXFl4yPWK1HHHj%2FfnCwvDBfAHs8eQKiMOizz8oGOqUBKfJfwxIptw7gJzLICKhvwypYF3XKhkiRLjiFiEMZL0wHoB2ksPGBrDjsVaadi%2FgvEnC6QqS55cgKqOCXUvX3dhFrsebm98%2F9cv3neG1nMkcZED%2Bl2ESL4hIHQrl%2FXCnNYzxdN1mnkj3nlSu9ruqjbj8LOU7C0hvPQF5euMKcg5V67ICnRn1%2FFg1e%2BW5yNziAzkslpJVG4GazEZtIvQJa5ZLdOBC1&X-Amz-Signature=5374836e5f1343d0ff4f0fa17dd5f205b016842030675426397e8469152fddc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


입력으로 주어진 종이의 한 변의 길이 N과 각 정사각형칸의 색(하얀색 또는 파란색)이 주어질 때 잘라진 하얀색 색종이와 파란색 색종이의 개수를 구하는 프로그램을 작성하시오.


## 입력


첫째 줄에는 전체 종이의 한 변의 길이 N이 주어져 있다. N은 2, 4, 8, 16, 32, 64, 128 중 하나이다. 색종이의 각 가로줄의 정사각형칸들의 색이 윗줄부터 차례로 둘째 줄부터 마지막 줄까지 주어진다. 하얀색으로 칠해진 칸은 0, 파란색으로 칠해진 칸은 1로 주어지며, 각 숫자 사이에는 빈칸이 하나씩 있다.


## 출력


첫째 줄에는 잘라진 햐얀색 색종이의 개수를 출력하고, 둘째 줄에는 파란색 색종이의 개수를 출력한다.


## 예제 입력 


```plain text
8
1 1 0 0 0 0 1 1
1 1 0 0 0 0 1 1
0 0 0 0 1 1 0 0
0 0 0 0 1 1 0 0
1 0 0 0 1 1 1 1
0 1 0 0 1 1 1 1
0 0 1 1 1 1 1 1
0 0 1 1 1 1 1 1
```


## 예제 출력 


```plain text
9
7
```


## 해결 방안


분할 정복 방식으로 blue/white를 구분하여 카운트


가장 큰 정사각형부터 모든 칸을 탐색 

1. 다른 색일 경우 4 등분으로 분할하여 다시 탐색
2. 같은 색일 경우 blue/white에 따라 카운트

해당 방식으로 크기가 1 이 될 때까지 분할하여 최종적으로 값을 구함


## 알고리즘

1. 주어지는 n의 크기만큼 이중 for문으로 탐색 시작 - 이때 기준은 주어진 인덱스(arr[p][q])의 색깔

    색깔이 다르면 false, 같으면 true로 이후 분할 여부 결정.

2. 분할 시 8*8 크기면 4*4의 작은 정사각형 4개로 분할 → 기존 size를 2로 나누어 newsize로 설정

    총 4번의 재귀 함수를 호출하여 각각 4 등분 한 정사각형의 arr[0][0]부터 newsize 만큼 탐색 시작.


## 코드


```c++
#include <iostream>
#include <vector>
using namespace std;
vector<vector<int>> arr;
int blue = 0;
int white = 0;

bool isSameColor(int p,int q,int size){
	int color = arr[p][q];
	for(int i=p; i<p+size; ++i)
		for(int j=q; j<q+size; ++j)
			if(arr[i][j]!=color) return 0;

	return 1;
}

void partition(int p,int q,int size){
	
	if(isSameColor(p,q,size)){
		if(!arr[p][q]) white++;
		else	blue++;
		return;
	}

	int newsize = size /2;

	partition(p,q,newsize);
	partition(p,q+newsize,newsize);
	partition(p+newsize,q,newsize);
	partition(p+newsize,q+newsize,newsize);
}

int main(){

    int n;
    cin >> n;
    arr.assign(n, vector<int>(n));
    
    for(int i=0;i<n;++i)
    	for(int j=0; j<n; ++j)
    		cin >> arr[i][j];

    partition(0,0,n);
    cout<<white<<"\n"<<blue<<endl;
}
```


