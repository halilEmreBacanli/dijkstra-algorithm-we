# Smart Route Navigator 🗺️

Dijkstra's Algorithm kullanarak en kısa yol bulan interaktif web harita uygulaması.

## 📋 Proje Hakkında

Bu proje, CENG 3511 Yapay Zeka dersi için geliştirilmiş bir web uygulamasıdır. Kullanıcıların Türkiye haritası üzerinde iki şehir seçerek aralarındaki en kısa yolu Dijkstra algoritması ile bulmasını sağlar.

## ✨ Özellikler

- **İnteraktif Leaflet Haritası**: OpenStreetMap tabanlı görsel harita
- **Graf Tabanlı Yol Ağı**: Önceden tanımlanmış şehirler ve mesafeler
- **Dijkstra Algoritması**: En kısa yol hesaplama
- **Görsel Yol Çizimi**: Polyline ile rota görselleştirme
- **Mesafe Hesaplama**: Toplam km cinsinden mesafe gösterimi

## 🛠️ Teknolojiler

- HTML5
- CSS3
- JavaScript (Vanilla)
- Leaflet.js (Harita kütüphanesi)

## 📁 Proje Yapısı

```
smart-route-finder/
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası
├── script.js           # Ana uygulama mantığı
├── dijkstra.js         # Dijkstra algoritması implementasyonu
├── graph-data.json     # Şehir ve yol verileri
└── README.md           # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### Yöntem 1: Doğrudan Tarayıcıda Açma
1. Projeyi indirin veya klonlayın
2. `index.html` dosyasını bir web tarayıcısında açın

### Yöntem 2: Yerel Sunucu ile (Önerilen)
```bash
# Python 3 ile
python -m http.server 8000

# Node.js ile (live-server paketi gerekli)
npx live-server
```
Ardından tarayıcıda `http://localhost:8000` adresine gidin.

## 📖 Kullanım

1. Haritada bir şehre tıklayarak **başlangıç noktası** seçin (yeşil olur)
2. Başka bir şehre tıklayarak **bitiş noktası** seçin (kırmızı olur)
3. **"Yol Bul"** butonuna tıklayın
4. En kısa rota mor çizgiyle haritada gösterilir
5. Toplam mesafe ve geçilen şehirler yan panelde görüntülenir
6. Yeni bir arama için **"Sıfırla"** butonuna tıklayın

## 🧮 Dijkstra Algoritması

Dijkstra algoritması, ağırlıklı graflarda tek kaynaklı en kısa yol problemini çözer:

1. Başlangıç düğümüne 0, diğer tüm düğümlere sonsuz mesafe ata
2. Ziyaret edilmemiş düğümler arasından en küçük mesafeye sahip olanı seç
3. Bu düğümün komşularının mesafelerini güncelle
4. Hedef düğüme ulaşana kadar tekrarla
5. Yolu geriye doğru takip ederek rotayı oluştur

**Zaman Karmaşıklığı**: O(V²) - V: düğüm sayısı

## 📊 Graf Verisi

Uygulama Türkiye'nin 8 büyük şehrini içerir:
- İstanbul, Ankara, İzmir, Bursa
- Eskişehir, Antalya, Konya, Denizli

Kenar ağırlıkları gerçek karayolu mesafelerine yakın değerlerdir (km).

## 📝 Geliştirme Notları

- Graf verisi `graph-data.json` dosyasından yüklenir
- Yeni şehirler eklemek için JSON dosyasını düzenleyin
- Kenarlar çift yönlüdür (bidirectional)

## 👤 Geliştirici

CENG 3511 - Yapay Zeka Dersi Final Projesi

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
