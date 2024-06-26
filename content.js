(() => {
  let show_all = true;
  let has_photo = (node) => node.querySelector('[data-testid="tweetPhoto"]');
  let has_video = (node) => node.querySelector('[data-testid="videoPlayer"]');
  let has_card_media = (node) => node.querySelector('[data-testid*="media"]');
  let has_media = (node) =>
    [has_photo, has_video, has_card_media].some((f) => f(node));
  let get_target_parent = (node) => node.parentNode.parentNode.parentNode;
  let for_each_article = (func) =>
    document.body.querySelectorAll('article').forEach(func);
  let set_article_state = (node) =>
    (get_target_parent(node).style.display =
      show_all || has_media(node) ? 'block' : 'none');
  let set_all_article_states = () => void for_each_article(set_article_state);
  let button = document.createElement('button');

  let create_ui = () => {
    button.style.marginTop = '20px';
    let area = document.querySelectorAll(
      'header > div > div > div > div > div'
    )[2];

    style_ui();

    area.appendChild(button);
    let set_button_state = () => {
      if (document.querySelector('header > div > div > div').offsetWidth > 100)
        button.innerText = show_all
          ? 'Showing all home posts'
          : 'Showing media only';
      else button.innerText = show_all ? 'All' : 'Media';
    };

    button.onclick = function () {
      show_all = !show_all;
      set_button_state();
    };

    set_button_state();
  };

  let check_ui = () => {
    let button = document.querySelector(
      'header > div > div > div > div > div > button'
    );

    if (!button || button.style.display === 'none') return false;
    else return true;
  };

  let style_ui = () => {
    if (document.querySelector('header > div > div > div').offsetWidth > 100)
      button.innerText = show_all
        ? 'Showing all home posts'
        : 'Showing media only';
    else button.innerText = show_all ? 'All' : 'Media';

    let area = document.querySelectorAll(
      'header > div > div > div > div > div'
    )[2];

    let tweetButtonStyle =
      area.querySelector('a').className +
      ' ' +
      area.querySelector('a > div').className +
      ' ' +
      area.querySelector('a > div > span').className;

    button.className = tweetButtonStyle;
    button.style.backgroundColor = window
      .getComputedStyle(area.querySelector('a'))
      .getPropertyValue('background-color');

    button.style.color = window
      .getComputedStyle(area.querySelector('a > div > span'))
      .getPropertyValue('color');

    button.style.fontFamily = window
      .getComputedStyle(area.querySelector('a > div > span'))
      .getPropertyValue('font-family');

    button.style.minWidth = '50px';
  };

  let start_process = () => {
    setInterval(() => {
      if (location.pathname === '/home') {
        set_all_article_states();
      } else {
        button.style.display = 'none';
      }
    });
  };

  let scan_interval = setInterval(() => {
    let target = document.body.querySelector("h1[role='heading']");
    if (target) {
      clearInterval(scan_interval);
      start_process(target);
      create_ui(target);
    }
  }, 10);

  window.onresize = () => {
    style_ui();
  };

  window.onclick = () => {
    if (!check_ui() && location.pathname === '/home') {
      create_ui();
      button.style.display = 'flex';
    }
  };
})();
