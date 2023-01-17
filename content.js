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

  let create_ui = () => {
    let button = document.createElement('button');
    let bStyle = button.style;
    bStyle.color = 'white';
    bStyle.cursor = 'pointer';
    bStyle.fontFamily = 'TwitterChirp';
    bStyle.fontSize = '17px';
    bStyle.fontWeight = 700;
    bStyle.lineHeight = '20px';
    bStyle.marginTop = '20px';
    bStyle.borderRadius = '999px';
    bStyle.backgroundColor = 'rgb(0, 167, 112)';
    bStyle.border = 'none';
    bStyle.minHeight = '52px';
    bStyle.minHeight = '52px';
    bStyle.padding = '0px 32px';
    bStyle.transition = '0.2s background-color';

    let area = document.querySelectorAll(
      'header > div > div > div > div > div'
    )[2];

    area.appendChild(button);
    let set_button_state = () => {
      button.innerText = show_all
        ? 'Showing all home tweets'
        : 'Showing only media home tweets';
    };

    button.onclick = function () {
      show_all = !show_all;
      set_button_state();
    };

    set_button_state();
  };

  let start_process = function () {
    setInterval(function () {
      if (location.pathname == '/home') {
        set_all_article_states();
      }
    });
  };

  // Wait for twitter's react crap finish loading things.
  let scan_interval = setInterval(function () {
    let target = document.body.querySelector("h1[role='heading']");
    if (target) {
      clearInterval(scan_interval);
      start_process(target);
      create_ui(target);
    }
  }, 10);
})();
