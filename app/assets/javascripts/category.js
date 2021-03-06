$(document).on('turbolinks:load', function(){
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成
  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = `<div class='listing-select-wrapper__added' id= 'children_wrapper'>
                        <div class='listing-select-wrapper__box' style='width:300px;'>
                          <select class="listing-select-wrapper__box--select" id="child_category" name="item[category_id]">
                            <option value="カテゴリーを選択する" data-category="カテゴリーを選択する">カテゴリーを選択する</option>
                            ${insertHTML}
                          <select>
                          <i class='fas fa-chevron-down listing-select-wrapper__box--arrow-down'></i>
                        </div>
                      </div>`;
    $('.content__wrapper__box__right__category__right').append(childSelectHtml);
  }
  // 孫カテゴリーの表示作成
  function appendGrandchidrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `<div class='listing-select-wrapper__added' id= 'grandchildren_wrapper'>
                              <div class='listing-select-wrapper__box' style='width:300px;'>
                                <select class="listing-select-wrapper__box--select" id="grandchild_category" name="item[category_id]">
                                  <option value="カテゴリーを選択する" data-category="カテゴリーを選択する">カテゴリーを選択する</option>
                                  ${insertHTML}
                                </select>
                                <i class='fas fa-chevron-down listing-select-wrapper__box--arrow-down'></i>
                              </div>
                            </div>`;
    $('.content__wrapper__box__right__category__right').append(grandchildSelectHtml);
  }
  // 親カテゴリー選択後のイベント
  $('#parent_category').on('change', function(){
    var parentCategory = document.getElementById('parent_category').value;//選択された親カテゴリーの名前を取得
    if (parentCategory != "カテゴリーを選択する"){ //親カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/items/get_category_children',
        type: 'GET',
        data: { parent_id: parentCategory },
        dataType: 'json'
      })
      .done(function(children){
        $('#children_wrapper').remove(); //親が変更された時、子以下を削除する
        $('#grandchildren_wrapper').remove();
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child);
        });
        appendChidrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#children_wrapper').remove(); //親カテゴリーが初期値になった時、子以下を削除する
      $('#grandchildren_wrapper').remove();
    }
  });
  // 子カテゴリー選択後のイベント
  $('.content__wrapper__box__right__category__right').on('change', '#child_category', function(){
    var childId = document.getElementById('child_category').value;//選択された子カテゴリーのidを取得
    if (childId != "カテゴリーを選択する"){ //子カテゴリーが初期値でないことを確認
      $.ajax({
        url: '/items/get_category_grandchildren',
        type: 'GET',
        data: { child_id: childId },
        dataType: 'json'
      })
      .done(function(grandchildren){
        if (grandchildren.length != 0) {
          $('#grandchildren_wrapper').remove(); //子が変更された時、孫以下を削除する
          var insertHTML = '';
          grandchildren.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          appendGrandchidrenBox(insertHTML);
        }
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchildren_wrapper').remove(); //子カテゴリーが初期値になった時、孫以下を削除する
    }
  });
  $('#parent_category').on('change', function(){
    $('.content__wrapper__box__right__brand').css('display', 'none');
    $('.content__wrapper__box__right__size').css('display', 'none');
  });

  $('.content__wrapper__box__right__category__right').on('change', '#child_category', function(){
    $('.content__wrapper__box__right__brand').css('display', 'none');
    $('.content__wrapper__box__right__size').css('display', 'none');
  });

  $('.content__wrapper__box__right__category__right').on('change', '#grandchild_category', function(){
    $('.content__wrapper__box__right__brand').css('display', 'flex');
    $('.content__wrapper__box__right__size').css('display', 'flex');
  });
  // editページでカテゴリーが選択されなかったときのalert
  $('#editSubmit').click(function(){
    var value = document.getElementById("child_category").value;    
    if (value == "カテゴリーを選択する") {
      alert('カテゴリーを選択してください');
      return false;
    }
    var value2 = document.getElementById("grandchild_category").value;    
    if (value2 == "カテゴリーを選択する") {
      alert('カテゴリーを選択してください');
      return false;
    }
  });
  // renderで戻され、カテゴリーがファッションのみの場合のalert(newのみ)
  $('#exhibitionSubmit').click(function(){
    var value3 = document.getElementById('parent_category').value; 
    var value = document.getElementById("child_category");    
    if(value == null && value3 == 1){
      alert('カテゴリーを選択してください');
      return false;
    }
  });
});
