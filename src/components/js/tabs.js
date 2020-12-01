const allTabs = document.querySelectorAll('.tabs');

allTabs.forEach((tabs) => {
  const tabsBtns = tabs.querySelectorAll('.tabs__nav-btn');
  const tabsItems = tabs.querySelectorAll('.tabs__item');

  tabsBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const activeTabsBtn = tabs.querySelector('.tabs__nav-btn_active');
      const activeTabsItem = tabs.querySelector('.tabs__item_active');

      activeTabsBtn.classList.remove('tabs__nav-btn_active');
      activeTabsItem.classList.remove('tabs__item_active');
      
      btn.classList.add('tabs__nav-btn_active');
      tabsItems[index].classList.add('tabs__item_active');
    });
  });
});