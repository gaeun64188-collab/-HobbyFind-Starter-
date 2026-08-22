const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 저장할 폴더 경로 (public/hobbies)
const outputDir = path.join(__dirname, 'public', 'hobbies');

// 17가지 취미 및 Unsplash 이미지 키워드 매핑
const hobbies = [
  // 운동형
  { name: 'sports_running.jpg', keyword: 'running,jogging' },
  { name: 'sports_yoga.jpg', keyword: 'yoga' },
  { name: 'sports_swimming.jpg', keyword: 'swimming' },
  { name: 'sports_cycling.jpg', keyword: 'cycling,bicycle' },
  { name: 'sports_climbing.jpg', keyword: 'bouldering,climbing' },
  { name: 'sports_dance.jpg', keyword: 'dance' },
  // 수집형
  { name: 'collector_lp.jpg', keyword: 'vinyl,turntable' },
  { name: 'collector_beverage.jpg', keyword: 'whiskey,coffee-beans' },
  { name: 'collector_plants.jpg', keyword: 'houseplants,pottery' },
  { name: 'collector_sneakers.jpg', keyword: 'sneakers' },
  { name: 'collector_lego.jpg', keyword: 'lego,figurine' },
  // 예술형
  { name: 'art_drawing.jpg', keyword: 'painting,canvas' },
  { name: 'art_instrument.jpg', keyword: 'acoustic-guitar' },
  { name: 'art_cooking.jpg', keyword: 'cooking,food-plating' },
  { name: 'art_calligraphy.jpg', keyword: 'calligraphy,ink' },
  { name: 'art_pottery.jpg', keyword: 'pottery,wheel' },
  { name: 'art_writing.jpg', keyword: 'journal,writing' },
];

async function downloadImages() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 취미 이미지 17개 다운로드를 시작합니다...');

  for (const hobby of hobbies) {
    const imageUrl = `https://source.unsplash.com/600x400/?${hobby.keyword}`;
    const filePath = path.join(outputDir, hobby.name);

    try {
      const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`✅ 저장 완료: ${hobby.name}`);
    } catch (error) {
      console.error(`❌ 실패 (${hobby.name}):`, error.message);
    }
  }

  console.log('🎉 모든 취미 이미지가 public/hobbies 폴더에 저장되었습니다!');
}

downloadImages();