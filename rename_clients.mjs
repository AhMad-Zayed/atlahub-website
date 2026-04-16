import fs from 'fs';
import path from 'path';

const contentPath = './src/data/content.json';
const clientsDir = './public/assets/images/clients';

let content = fs.readFileSync(contentPath, 'utf-8');

const renames = [
  { old: ' Palestinian Vision Organization.png', new: 'palestinian-vision-org.png' },
  { old: 'Almatalleh Villas - فلل المطلة.jpg', new: 'almatalleh-villas.jpg' },
  { old: 'Master Butcher .jpg', new: 'master-butcher.jpg' },
  { old: 'Tamer_Beauty_Center.jpg', new: 'tamer-beauty-center.jpg' },
  { old: 'Tia_beauty_center.jpg', new: 'tia-beauty-center.jpg' },
  { old: 'Zena_Beauty.jpg', new: 'zena-beauty.jpg' },
  { old: 'اللجنة المركزية لأولياء امور مدارس سلوان.jpg', new: 'silwan-schools.jpg' },
  { old: 'بوكيه ward.jpg', new: 'bouquet-ward.jpg' },
  { old: 'زعترة للسياحة والسفر-Zatra Tourism &Travel.jpg', new: 'zatra-tourism-travel.jpg' },
  { old: 'شركة أسياد لخدمات التوصيل.jpg', new: 'asyad-delivery.jpg' },
  { old: 'فادي حميدو ملك المعسل والاراجيل.png', new: 'fadi-hmaido.png' },
  { old: 'فلل الريحان للايجار اليومي أريحا.jpg', new: 'jericho-villas.jpg' },
  { old: 'كلية انوار القدس.jpg', new: 'al-quds-college.jpg' },
  { old: 'مجموعة آيا صوفيا العقارية.jpg', new: 'aya-sofia-real-estate.jpg' },
  { old: 'مجموعة بيت المقدس للعقارات.jpg', new: 'beit-al-maqdis-real-estate.jpg' },
  { old: 'مركز تمكين التعليمي.jpg', new: 'tamkeen-education.jpg' },
  { old: 'مطعم السلطان-Al sultan.jpg', new: 'al-sultan-restaurant.jpg' },
  { old: 'مطعم المطار الملكي.jpg', new: 'royal-airport-restaurant.jpg' },
  { old: 'مطعم ملك القدرة.png', new: 'king-qudra-restaurant.png' },
];

renames.forEach(({ old: oldName, new: newName }) => {
  const oldPath = path.join(clientsDir, oldName);
  const newPath = path.join(clientsDir, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  }
  
  // Replace in content.json
  const encodedOldName = encodeURIComponent(oldName);
  const regexLiteral = new RegExp(oldName.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1'), 'g');
  const regexEncoded = new RegExp(encodedOldName.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1'), 'g');
  
  content = content.replace(regexLiteral, newName);
  content = content.replace(regexEncoded, newName);
});

fs.writeFileSync(contentPath, content, 'utf-8');
console.log('Updated content.json successfully.');
