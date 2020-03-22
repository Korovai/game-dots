var listFormParent = document.querySelectorAll('.jsFormParent');
var listFormContentAll = document.querySelectorAll('.jsFormList');

listFormParent.forEach((elem, idx) => {
  var listFormText = elem.querySelector('.jsFormText');
  var listFormContent = elem.querySelector('.jsFormList');
  var listFormItem = elem.querySelectorAll('.jsFormListItem');

  listFormText.addEventListener('click', () => {
    listFormContent.classList.toggle('isActive');

    listFormContentAll.forEach((elem, idx) => {
      if(elem !== listFormContent && elem.classList.contains('isActive')) {
        elem.classList.remove('isActive');
      }
    });
  });

  listFormItem.forEach((elem, idx) => {
    elem.addEventListener('click', () => {
      var dataValue = elem.getAttribute('data-value');
      var dataText = elem.innerHTML;
      
      listFormText.innerHTML = `${dataText}`;
      listFormContent.classList.remove('isActive');
    });
  });
});