const btn=document.querySelector('.btn');
const titleDiv=document.querySelector('.titleDiv');

btn.addEventListener('click',(ev)=>{
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          const title = activeTab.title.split('-')[0];
          titleDiv.textContent = title;
        }
    });
})