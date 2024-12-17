const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = new Image();
let currentImageSrc = 'base.jpg';
let isTemplateLoaded = false;

// تنظیمات پیش‌فرض
const defaultFont = 'Samim';
const defaultFontSize = 65;
const defaultLineHeight = 30;
const defaultFontColor = '#000000';

img.src = currentImageSrc;
img.onload = () => drawImage();

document.getElementById('imageInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    img.src = URL.createObjectURL(file);
    currentImageSrc = img.src;
    isTemplateLoaded = false;
    img.onload = () => drawImage();
  }
});

function toggleSettings() {
  const settingsPanel = document.getElementById('settingsPanel');
  settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'flex' : 'none';
}

function drawImage() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function applySettings() {
  const fontSize = document.getElementById('fontSize').value || defaultFontSize;
  const fontColor = document.getElementById('fontColor').value || defaultFontColor;
  const fontFamily = document.getElementById('fontSelect').value || defaultFont;
  const lineHeight = document.getElementById('lineHeight').value || defaultLineHeight;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'center';
}

function addTextToImage() {
  const text = document.getElementById('textInput').value;
  const fontSize = document.getElementById('fontSize').value || defaultFontSize;
  const fontColor = document.getElementById('fontColor').value || defaultFontColor;
  const fontFamily = document.getElementById('fontSelect').value || defaultFont;
  const lineHeight = document.getElementById('lineHeight').value || defaultLineHeight;

  drawImage();

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'center';

  const lines = text.split('\n');
  const totalTextHeight = lines.length * (parseInt(fontSize) + parseInt(lineHeight));
  let startY = (canvas.height - totalTextHeight) / 2 + parseInt(fontSize);

  lines.forEach(line => {
    ctx.fillText(line, canvas.width / 2, startY);
    startY += parseInt(fontSize) + parseInt(lineHeight);
  });
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'output-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function loadTemplate(template) {
  currentImageSrc = template;
  img.src = template;
  isTemplateLoaded = true;
  img.onload = () => {
    drawImage();
    applySettings();
  };
}

// اعمال تنظیمات پیش‌فرض هنگام بارگذاری صفحه
window.onload = () => {
  document.getElementById('fontSelect').value = defaultFont;
  document.getElementById('fontSize').value = defaultFontSize;
  document.getElementById('fontColor').value = defaultFontColor;
  document.getElementById('lineHeight').value = defaultLineHeight;
  applySettings();
};
