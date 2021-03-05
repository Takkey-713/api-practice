本アプリはタスク管理アプリです。
React-Hooksを用いて実装しています。

※アプリケーション動作GIF
![TaskApp](https://user-images.githubusercontent.com/70302566/110121696-0db60880-7e02-11eb-9d2f-3eeee9ea1855.gif)

ユーザー認証(新規登録)
・emailとpasswordと確認passwordを入力します。
<img width="881" alt="スクリーンショット 2021-03-05 22 31 57" src="https://user-images.githubusercontent.com/70302566/110122171-9cc32080-7e02-11eb-83e2-6545f06397a2.png">

◎リストの作成
・ログインもしくは新規登録後にリスト追加用の要素をクリックするとフォームに切り替わります。
<img width="1200" alt="スクリーンショット 2021-03-05 22 32 28" src="https://user-images.githubusercontent.com/70302566/110122674-430f2600-7e03-11eb-8551-f6a9bf5c4606.png">

・リスト追加用の要素をクリックするとフォームに切り替わりました。
<img width="1194" alt="スクリーンショット 2021-03-05 22 34 24" src="https://user-images.githubusercontent.com/70302566/110122767-5de19a80-7e03-11eb-9106-02be7faa7c36.png">

・追加するをクリックすると新規リストが作成されます。
<img width="1192" alt="スクリーンショット 2021-03-05 22 40 13" src="https://user-images.githubusercontent.com/70302566/110123256-055ecd00-7e04-11eb-8937-49b7e5893577.png">

◎タスクの作成
・作成したリスト要素にはタスクを作成するフォームがあり、クリックするとタスク作成フォームに切り替わります。
<img width="1192" alt="スクリーンショット 2021-03-05 22 43 33" src="https://user-images.githubusercontent.com/70302566/110123682-8d44d700-7e04-11eb-9185-3b2d7ea98032.png">

・タスク内容を入力して「タスクを追加する」をクリックすると新規タスクが作成されます。

◎タスクの編集&削除
先ほど作成したタスクをクリックするとモーダル画面が展開されるので、作成したタスクの情報を編集することができます。
<img width="1200" alt="スクリーンショット 2021-03-05 22 32 28" src="https://user-images.githubusercontent.com/70302566/110125169-5e2f6500-7e06-11eb-8c3a-af1da76e2386.png">

<img width="1193" alt="スクリーンショット 2021-03-05 22 59 54" src="https://user-images.githubusercontent.com/70302566/110125288-828b4180-7e06-11eb-831b-9341a7dcf0ca.png">

・内容を変更した後に、再度タスクを確認すると変更されていることが確認できます。

・モーダルにある削除ボタンをクリックすると該当するタスクが削除されます。
<img width="1196" alt="スクリーンショット 2021-03-05 23 01 19" src="https://user-images.githubusercontent.com/70302566/110125594-d26a0880-7e06-11eb-88d7-c74c4dcdf958.png">

・削除ボタンをクリックすると該当されたタスクが削除されます。
<img width="1008" alt="スクリーンショット 2021-03-05 23 04 13" src="https://user-images.githubusercontent.com/70302566/110125851-1d841b80-7e07-11eb-900f-ebb449e6b293.png">


◎リストの削除&タスクが所属するリストの更新
リストとタスクが2つ以上ある状態にします。
<img width="1003" alt="スクリーンショット 2021-03-05 23 05 39" src="https://user-images.githubusercontent.com/70302566/110126118-6f2ca600-7e07-11eb-91a0-f4ca20a1b668.png">

・タスクのモーダルを開くとタスクが所属するリストの情報が表示されるので、リストを変更するとタスクが所属するリストを変更することができます。

<img width="1004" alt="スクリーンショット 2021-03-05 23 08 28" src="https://user-images.githubusercontent.com/70302566/110126381-b61a9b80-7e07-11eb-9e56-ea120305c16b.png">

・「リスト１」から「リスト2」を選んで更新するとタスクの所属するリストが更新されます。

<img width="1002" alt="スクリーンショット 2021-03-05 23 09 58" src="https://user-images.githubusercontent.com/70302566/110126588-ea8e5780-7e07-11eb-8229-2c4310769a6b.png">

リストにある「:アイコン」をクリックすると、モーダルが展開されます。そこでタスクの更新、削除、追加、リストの削除が可能です。
<img width="1010" alt="スクリーンショット 2021-03-05 23 10 29" src="https://user-images.githubusercontent.com/70302566/110126932-507adf00-7e08-11eb-94ac-6ae1cbb6cea6.png">

・モーダル
<img width="1003" alt="スクリーンショット 2021-03-05 23 13 42" src="https://user-images.githubusercontent.com/70302566/110127060-7dc78d00-7e08-11eb-90b2-4548d280307e.png">

リストを削除するボタンをクリックすると該当するリストとタスクが削除されます。

◎期限が過ぎたタスクの色を変更されます。
期限がすぎるとタスク要素の表示が赤くなり、モーダルでは「期限が過ぎている」と表示されます。
<img width="1008" alt="スクリーンショット 2021-03-05 23 15 24" src="https://user-images.githubusercontent.com/70302566/110127318-d860e900-7e08-11eb-8198-d95275e3f783.png">



<img width="998" alt="スクリーンショット 2021-03-05 23 15 31" src="https://user-images.githubusercontent.com/70302566/110127365-e44cab00-7e08-11eb-912d-db49d7dd9559.png">
※本日が3/5なので期限が3/5までのタスクは全て表示が赤くなります。

以上が本アプリケーションの使い方になります。



