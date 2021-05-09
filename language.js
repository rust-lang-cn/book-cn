(function () {
  var url = window.location.href;
  var host = window.location.host;

  var search = {
    en: "/en/",
    zh_CN: "/zh-CN/"
  }

  var replaceWith = {
    en: "/zh-CN/",
    zh_CN: "/en/"
  }


  var link = "";
  var word = "";

  if (url.indexOf(search.en) != -1 && url.indexOf(search.en) === (url.indexOf(host) + host.length)) {
    link = url.replace(search.en, replaceWith.en);
    word = "简体中文";
  } else if (url.indexOf(search.zh_CN) != -1 && url.indexOf(search.zh_CN) === (url.indexOf(host) + host.length)) {
    link = url.replace(search.zh_CN, replaceWith.zh_CN);
    word = "English";
  }

  var node = '<a href="' + link + '"><i id="print-button" class="fa fa-language"> ' + word + '</i></a>';
  var insertNode = document.getElementsByClassName('right-buttons');
  if (insertNode.length > 0 && link != "") {
    var html = insertNode[0].innerHTML;
    insertNode[0].innerHTML = html + node;
  }
})()  
