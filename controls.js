// 確認ダイアログの表示(JQuery)
function ShowJQueryConfirmDialog() {
    var result = false;
	var strTitle = "確認ダイアログ";
	var strComment = "これは確認ダイアログです。";
	
	// ダイアログのメッセージを設定
	$( "#show_dialog" ).html( strComment );
	
	// ダイアログを作成
	$( "#show_dialog" ).dialog({
		modal: true,
		title: strTitle,
		buttons: {
			"OK": function() {
				$( this ).dialog( "close" );
				result = true;
				// ShowJQueryMessageDialog( "OKがクリックされました" );
			},
			"キャンセル": function() {
				$( this ).dialog( "close" );
				result = false;
				// ShowJQueryMessageDialog( "キャンセルがクリックされました" );
			}
		}
	});
	ShowJQueryMessageDialog(result);
	//alert("AAAAFDSASAA");
	return result;
}
// メッセージダイアログの表示(JQuery)
function ShowJQueryMessageDialog( strComment ) {
	var strTitle = "メッセージダイアログ";
	
	// ダイアログのメッセージを設定
	$( "#show_dialog" ).html( strComment );

	// ダイアログを作成
	$( "#show_dialog" ).dialog({
		modal: true,
		title: strTitle,
		buttons: {
		}
	});
}
