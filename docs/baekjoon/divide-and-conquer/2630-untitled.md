---
title: "색종이 만들기"
boj: 2630
tier: "SILVER 2"
algorithms: "Divide and Conquer"
date: "2025-12-23"
---

## 문제


아래 <그림 1>과 같이 여러개의 정사각형칸들로 이루어진 정사각형 모양의 종이가 주어져 있고, 각 정사각형들은 하얀색으로 칠해져 있거나 파란색으로 칠해져 있다. 주어진 종이를 일정한 규칙에 따라 잘라서 다양한 크기를 가진 정사각형 모양의 하얀색 또는 파란색 색종이를 만들려고 한다.


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6dab810-ded1-4828-bfb2-eef9b115ca70/81d12b72-1f9b-441e-851e-a7cca75cd0c4/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTSC733P%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T184041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4Y0DwsJ6Ow0V3Adq85tIzOtIk4SZ9z9qEwjrexCVg1QIgDKLchdeYPNriiov8q8oFZtC%2FvVLxZaISFd%2F3gf13AswqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHnNpcgDM6GkYnDATircA8casJzNURml7GGXMlhKuFrUcLtGRy4ClE9vKdZyCAOXLkeYyRrsuW4Bfoklz5LeQitN3N%2B1MeQGPiqyE44vrqD%2BzREE7bt07nSQr87ay3%2BGSekzUud1f6nj1nhb8YlfnfsOfmVGjVPrSCoGTcEM2LNVdIRqG4%2FbsC8p7cH6T5yagmIz%2F9y9uqd44FZWF3nhJW0FpgvAJ%2Bbqz8F3GljR5VW8cPtyuwyLrCe%2B%2BQtOXrdHUCVAyQpVacyKE1OSDOaaiPORqFi6mf2scJmjoxy0YjL%2FAKqhaqij5Z5C4Szk7A6y4JmhWfkwuPDuCg5UqiDERUgCfCruUvYnPuu%2Bj2KxnPczv0Z8dCs72za880Ixh0YZE5L4QesTrL1BI1%2Bqvx4PWBrcSzLqzFnTpIXXzFlEXUz60FJ8d6lKGVPlkfYWJVG7Nzw5xwQgbvin65C53JuxcEG5BbOSMDnOiYI5qNka6IpAUkKvA06TLEXIenciRvaNPkuNVmwUu3fmjkISkgSA19GUgF%2FSzGqPB3McmADNU%2FVSc%2FG%2BBM6sMasHms%2FRfbu3d6r4uc6hgMa5LGh34fnEYEXzaqnQN5VzKeyanm2488V4%2BHLKYJYxmrpSAhUdD5JXwG%2BbKFkmxb5qMDh3MMuyz8oGOqUBsVZaJIJ2Krou3x3ElKgdVzpKh49AY6Ig9RhrelyJrMExadycbLKl3vTW2JYzTplayT2RBbfXzFdz3bJJrrCuA3yCsW1esBrNGiTmziohjIbg9PdALlp18dbaV8q%2BIeH1DCsgn4PPwgXyAbUCZ2%2B%2FEamZfu5BML7nmVGcwolbfkpLRr2alS0eTYcduGtj7Z3jCcoHQDFtr7rcmVUTGqHb50KGNTm9&X-Amz-Signature=b4caf8586be68c3645f834c7a48deed3dee749b54f17d6050f9243a3512a7db8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


전체 종이의 크기가 N×N(N=2k, k는 1 이상 7 이하의 자연수) 이라면 종이를 자르는 규칙은 다음과 같다.


전체 종이가 모두 같은 색으로 칠해져 있지 않으면 가로와 세로로 중간 부분을 잘라서 <그림 2>의 I, II, III, IV와 같이 똑같은 크기의 네 개의 N/2 × N/2색종이로 나눈다. 나누어진 종이 I, II, III, IV 각각에 대해서도 앞에서와 마찬가지로 모두 같은 색으로 칠해져 있지 않으면 같은 방법으로 똑같은 크기의 네 개의 색종이로 나눈다. 이와 같은 과정을 잘라진 종이가 모두 하얀색 또는 모두 파란색으로 칠해져 있거나, 하나의 정사각형 칸이 되어 더 이상 자를 수 없을 때까지 반복한다.


위와 같은 규칙에 따라 잘랐을 때 <그림 3>은 <그림 1>의 종이를 처음 나눈 후의 상태를, <그림 4>는 두 번째 나눈 후의 상태를, <그림 5>는 최종적으로 만들어진 다양한 크기의 9장의 하얀색 색종이와 7장의 파란색 색종이를 보여주고 있다.


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6dab810-ded1-4828-bfb2-eef9b115ca70/98b118d8-40c8-4ee2-af47-12dd2cec925b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTSC733P%2F20251230%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251230T184041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4Y0DwsJ6Ow0V3Adq85tIzOtIk4SZ9z9qEwjrexCVg1QIgDKLchdeYPNriiov8q8oFZtC%2FvVLxZaISFd%2F3gf13AswqiAQIt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHnNpcgDM6GkYnDATircA8casJzNURml7GGXMlhKuFrUcLtGRy4ClE9vKdZyCAOXLkeYyRrsuW4Bfoklz5LeQitN3N%2B1MeQGPiqyE44vrqD%2BzREE7bt07nSQr87ay3%2BGSekzUud1f6nj1nhb8YlfnfsOfmVGjVPrSCoGTcEM2LNVdIRqG4%2FbsC8p7cH6T5yagmIz%2F9y9uqd44FZWF3nhJW0FpgvAJ%2Bbqz8F3GljR5VW8cPtyuwyLrCe%2B%2BQtOXrdHUCVAyQpVacyKE1OSDOaaiPORqFi6mf2scJmjoxy0YjL%2FAKqhaqij5Z5C4Szk7A6y4JmhWfkwuPDuCg5UqiDERUgCfCruUvYnPuu%2Bj2KxnPczv0Z8dCs72za880Ixh0YZE5L4QesTrL1BI1%2Bqvx4PWBrcSzLqzFnTpIXXzFlEXUz60FJ8d6lKGVPlkfYWJVG7Nzw5xwQgbvin65C53JuxcEG5BbOSMDnOiYI5qNka6IpAUkKvA06TLEXIenciRvaNPkuNVmwUu3fmjkISkgSA19GUgF%2FSzGqPB3McmADNU%2FVSc%2FG%2BBM6sMasHms%2FRfbu3d6r4uc6hgMa5LGh34fnEYEXzaqnQN5VzKeyanm2488V4%2BHLKYJYxmrpSAhUdD5JXwG%2BbKFkmxb5qMDh3MMuyz8oGOqUBsVZaJIJ2Krou3x3ElKgdVzpKh49AY6Ig9RhrelyJrMExadycbLKl3vTW2JYzTplayT2RBbfXzFdz3bJJrrCuA3yCsW1esBrNGiTmziohjIbg9PdALlp18dbaV8q%2BIeH1DCsgn4PPwgXyAbUCZ2%2B%2FEamZfu5BML7nmVGcwolbfkpLRr2alS0eTYcduGtj7Z3jCcoHQDFtr7rcmVUTGqHb50KGNTm9&X-Amz-Signature=915bf32e40619c2909fbf3d81e228ce271ac50b9dfb6e255f7dda02208baada5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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


