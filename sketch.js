let idleSprite; // 儲存待機動畫的精靈圖。
let walkSprite; // 儲存行走動畫的精靈圖。
let characterX; // 儲存角色在畫布中的水平位置。
let characterY; // 儲存角色在畫布中的垂直位置。
let facingDirection = 1; // 設定角色朝向，1 代表右方，-1 代表左方。
const spriteScale = 2; // 設定角色顯示大小相對於單格圖片的放大倍率。
const moveSpeed = 3.5; // 設定角色每一影格的移動距離。

function preload() { // 在畫布開始繪製前載入角色圖片。
  idleSprite = loadImage("2/stop/stop.png"); // 載入包含三格待機動作的精靈圖。
  walkSprite = loadImage("2/walk/walk.png"); // 載入包含六格行走動作的精靈圖。
} // 結束圖片載入函式。

function setup() { // 設定全螢幕畫布與角色初始位置。
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
  imageMode(CENTER); // 讓圖片以角色位置為中心繪製。
  characterX = width / 2; // 將角色初始水平位置設在畫布中央。
  characterY = height / 2; // 將角色初始垂直位置設在畫布中央。
} // 結束畫布設定函式。

function draw() { // 每一影格更新角色狀態並繪製畫面。
  background("#ffe5ec"); // 使用指定的淡粉紅色清除畫面。

  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查目前是否按住鍵盤右方向鍵。
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查目前是否按住鍵盤左方向鍵。
  const isWalking = movingRight || movingLeft; // 判斷目前是否需要播放行走動畫。

  if (movingRight) { // 按住右方向鍵時執行向右移動。
    characterX += moveSpeed; // 將角色向右移動固定距離。
    facingDirection = 1; // 將角色朝向設定為右方。
  } else if (movingLeft) { // 沒有按右鍵而按住左方向鍵時執行向左移動。
    characterX -= moveSpeed; // 將角色向左移動固定距離。
    facingDirection = -1; // 將角色朝向設定為左方。
  } // 結束方向鍵移動判斷。

  const sprite = isWalking ? walkSprite : idleSprite; // 依移動狀態選擇行走或待機精靈圖。
  const frameCountForSprite = isWalking ? 6 : 3; // 設定行走有六格、待機有三格動畫。
  const frameWidth = sprite.width / frameCountForSprite; // 計算精靈圖中單格圖片的寬度。
  const frameHeight = sprite.height; // 取得精靈圖中單格圖片的高度。
  const animationSpeed = isWalking ? 7 : 10; // 設定行走與待機動畫切換影格的速度。
  const currentFrame = floor(frameCount / animationSpeed) % frameCountForSprite; // 計算目前循環播放的動畫格。
  const displayedWidth = frameWidth * spriteScale; // 計算畫面中角色的顯示寬度。

  characterX = constrain(characterX, displayedWidth / 2, width - displayedWidth / 2); // 限制角色不會移出畫布左右邊界。

  push(); // 暫存畫布設定，避免角色翻轉影響其他繪圖。
  translate(characterX, characterY); // 將座標原點移到角色目前的位置。
  scale(facingDirection, 1); // 依角色朝向水平翻轉圖片。
  image(sprite, 0, 0, displayedWidth, frameHeight * spriteScale, currentFrame * frameWidth, 0, frameWidth, frameHeight); // 裁切並繪製目前的動畫格。
  pop(); // 還原畫布設定。
} // 結束每影格繪製函式。

function windowResized() { // 瀏覽器視窗尺寸改變時重新調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小。
  characterX = constrain(characterX, 0, width); // 確保視窗縮小後角色仍在畫布內。
  characterY = constrain(characterY, 0, height); // 確保視窗縮小後角色仍在畫布內。
} // 結束視窗尺寸調整函式。
