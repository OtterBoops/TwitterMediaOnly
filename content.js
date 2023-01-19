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

    area.appendChild(button);
    let set_button_state = () => {
      if (document.getElementsByTagName('header')[0].offsetWidth > 100)
        button.innerText = show_all
          ? 'Showing all home tweets'
          : 'Showing only media home tweets';
      else button.innerText = show_all ? 'All' : 'Media';
    };

    button.onclick = function () {
      show_all = !show_all;
      set_button_state();
    };

    set_button_state();
  };

  let start_process = () => {
    setInterval(function () {
      if (location.pathname === '/home') {
        set_all_article_states();
      } else {
        button.style.display = 'none';
      }
    });
  };

  // Wait for twitter's react crap finish loading things.
  let scan_interval = setInterval(() => {
    let target = document.body.querySelector("h1[role='heading']");
    let sidebar = document.body.getElementsByTagName('header');
    if (target && sidebar) {
      clearInterval(scan_interval);
      start_process(target);
      create_ui(target);
    }
  }, 10);
})();
