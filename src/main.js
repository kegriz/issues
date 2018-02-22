import './style/main.scss';
import { data } from './data.js';

const qs = (element) => document.querySelector(element);
const qsa = (elements) => document.querySelectorAll(elements);

// counting Issues
function countingIssues() {
    let count_done = 0, count_open = 0;
    for(var i in data) {
        for(var n in data[i]) {
            if( data[i][n].progress == true ) {
                count_done++;
            } else {
                count_open++;
            }
        }
    }
    qs("#JS-all").innerHTML = count_open + count_done;
    qs("#JS-open").innerHTML = count_open;
    qs("#JS-done").innerHTML = count_done;
}

// show tabs content
function getContent() {
    let all = "", done = "", open = "";
    for(var i in data) {
        all += '<div class="date">'+i+'</div>';
        let c_done = 0, c_open = 0;
        for(var n in data[i]) {
            data[i][n].progress === true ? c_done++ : c_open++ ;
        }
        if( c_done > 0 ) done += '<div class="date">'+i+'</div>';
        if( c_open > 0 ) open += '<div class="date">'+i+'</div>';
        for(var n in data[i]) {
            var star = "";
            data[i][n].progress === true ? star = " star--checked" : star = "";
            all += '<div id='+data[i][n].id+' class="issues">'+data[i][n].text+'<div class="star'+star+'"></div></div>';
            if( data[i][n].progress === true ) {
              done += '<div id='+data[i][n].id+' class="issues">'+data[i][n].text+'<div class="star'+star+'"></div></div>';
            } else {
              open += '<div id='+data[i][n].id+' class="issues">'+data[i][n].text+'<div class="star'+star+'"></div></div>';
            }
        }
    }

    qs(".tab:nth-child(1)").innerHTML = all;
    qs(".tab:nth-child(2)").innerHTML = open;
    qs(".tab:nth-child(3)").innerHTML = done;

    // stars toogle
    qsa(".star").forEach((handler, i) => {
        handler.addEventListener('click', () => {
            handler.classList.toggle("star--checked");
            var clicked_id = handler.parentElement.getAttribute("id");
            for(var i in data) {
                for(var n in data[i]) {
                    if( data[i][n].id == clicked_id ) {
                        if( data[i][n].progress == true ) {
                            data[i][n].progress = false;
                        } else {
                            data[i][n].progress = true;
                        }
                        setTimeout(function(){
                            getContent();
                        }, 500);
                    }
                }
            }
        });
    });

    countingIssues();
}

document.addEventListener('DOMContentLoaded', () => {

  getContent();

  const tabHandler = qsa('.JS-tab-handler');
  const tabs = qsa('.JS-tab');

  // filters click action
  tabHandler.forEach((handler, i) => {
      handler.addEventListener('click', () => toggleTab(i));
  });

  // show tab
  function toggleTab(index) {
      tabs.forEach(tab => tab.classList.remove('tab--active'));
      tabs[index].classList.add('tab--active');
  }

  // choosing filters
  qsa(".sidebar-content__element").forEach((handler) => {
      handler.addEventListener('click', () => {
          qsa(".sidebar-content__element").forEach((choosen) => {
              choosen.classList.remove('selected');
          });
          handler.classList.add('selected');
      });
  });

  function closeWindow() {
      qs(".app-container").classList.add('app-container--close');
  }
  function hideWindow() {
      qs(".app-container").classList.toggle('app-container--hide');
      qs(".minimized").classList.toggle('minimized--visable');
  }
  function resizeWindow() {
      qs(".app-container").classList.toggle('app-container--resize');
      qs(".content").classList.toggle('content--resized');
  }

  // close button
  qs(".JS-exit").addEventListener('click', closeWindow);
  // hide button
  qs(".JS-hide").addEventListener('click', hideWindow);
  // resize button
  qs(".JS-resize").addEventListener('click', resizeWindow);
  // bottom icon button
  qs(".minimized").addEventListener('click', hideWindow);


});
