import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Cake {
  id: number;
  name: string;
  image: string;
  price: number;
  weight: string;
  flavor: string;
  filling: string;
  type: string;
  description: string;
}

const cakes: Cake[] = [
  {
    id: 1,
    name: 'Ягодное наслаждение',
    image: 'https://cdn.poehali.dev/projects/eac10ee9-6c7e-4660-98c1-456770155eba/files/1d05af77-e56d-4e87-ab85-7fc209012338.jpg',
    price: 3500,
    weight: '1.5 кг',
    flavor: 'Ванильный',
    filling: 'Ягодный мусс',
    type: 'Праздничный',
    description: 'Нежный бисквит с натуральным ягодным муссом и свежими ягодами',
  },
  {
    id: 2,
    name: 'Шоколадная роскошь',
    image: 'https://cdn.poehali.dev/projects/eac10ee9-6c7e-4660-98c1-456770155eba/files/6c909bae-e5cc-432e-ae06-5c2a6f9c14a1.jpg',
    price: 4200,
    weight: '2 кг',
    flavor: 'Шоколадный',
    filling: 'Шоколадный ганаш',
    type: 'Свадебный',
    description: 'Премиальный бельгийский шоколад с золотым декором',
  },
  {
    id: 3,
    name: 'Цветочная элегантность',
    image: 'https://cdn.poehali.dev/projects/eac10ee9-6c7e-4660-98c1-456770155eba/files/803e7ee1-6715-4be1-a525-8d16be40cc22.jpg',
    price: 3800,
    weight: '1.5 кг',
    flavor: 'Ванильный',
    filling: 'Сливочный крем',
    type: 'Свадебный',
    description: 'Утонченный торт с живыми цветами и воздушным кремом',
  },
  {
    id: 4,
    name: 'Карамельный сон',
    image: 'https://cdn.poehali.dev/projects/eac10ee9-6c7e-4660-98c1-456770155eba/files/1d05af77-e56d-4e87-ab85-7fc209012338.jpg',
    price: 3200,
    weight: '1 кг',
    flavor: 'Карамельный',
    filling: 'Соленая карамель',
    type: 'Детский',
    description: 'Нежная карамель с морской солью и сливочным кремом',
  },
  {
    id: 5,
    name: 'Фруктовый рай',
    image: 'https://cdn.poehali.dev/projects/eac10ee9-6c7e-4660-98c1-456770155eba/files/803e7ee1-6715-4be1-a525-8d16be40cc22.jpg',
    price: 3600,
    weight: '1.5 кг',
    flavor: 'Фруктовый',
    filling: 'Фруктовое желе',
    type: 'Праздничный',
    description: 'Свежие сезонные фрукты с легким желе',
  },
  {
    id: 6,
    name: 'Классика вкуса',
    image: 'https://cdn.poehali.dev/projects/eac10ee9-6c7e-4660-98c1-456770155eba/files/6c909bae-e5cc-432e-ae06-5c2a6f9c14a1.jpg',
    price: 2800,
    weight: '1 кг',
    flavor: 'Ванильный',
    filling: 'Масляный крем',
    type: 'Классический',
    description: 'Проверенная классика для настоящих ценителей',
  },
];

const Index = () => {
  const [filters, setFilters] = useState({
    flavor: 'Все',
    weight: 'Все',
    filling: 'Все',
    type: 'Все',
  });

  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  const flavors = ['Все', ...Array.from(new Set(cakes.map(c => c.flavor)))];
  const weights = ['Все', ...Array.from(new Set(cakes.map(c => c.weight)))];
  const fillings = ['Все', ...Array.from(new Set(cakes.map(c => c.filling)))];
  const types = ['Все', ...Array.from(new Set(cakes.map(c => c.type)))];

  const filteredCakes = cakes.filter(cake => {
    return (
      (filters.flavor === 'Все' || cake.flavor === filters.flavor) &&
      (filters.weight === 'Все' || cake.weight === filters.weight) &&
      (filters.filling === 'Все' || cake.filling === filters.filling) &&
      (filters.type === 'Все' || cake.type === filters.type)
    );
  });

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заказ отправлен! Мы свяжемся с вами в ближайшее время');
    setOrderDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold text-accent">Confiserie Élégante</h1>
          <nav className="hidden md:flex gap-8">
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Галерея</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#delivery" className="hover:text-primary transition-colors">Доставка</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-6xl md:text-7xl font-serif font-bold mb-6 text-accent">
            Искусство кондитерского мастерства
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Создаём торты, которые превращают каждое мгновение в праздник
          </p>
          <Button size="lg" className="text-lg" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
            Посмотреть коллекцию
            <Icon name="ChevronDown" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-12 text-accent">Наша коллекция</h2>
          
          <div className="mb-8 p-6 bg-secondary/20 rounded-2xl backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Вкус</Label>
                <Select value={filters.flavor} onValueChange={(value) => setFilters({...filters, flavor: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {flavors.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Вес</Label>
                <Select value={filters.weight} onValueChange={(value) => setFilters({...filters, weight: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weights.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Начинка</Label>
                <Select value={filters.filling} onValueChange={(value) => setFilters({...filters, filling: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fillings.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Тип торта</Label>
                <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCakes.map((cake, idx) => (
              <Card 
                key={cake.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in border-0 bg-card/50 backdrop-blur-sm cursor-pointer group"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => setSelectedCake(cake)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={cake.image} 
                    alt={cake.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {cake.type}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-2">{cake.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{cake.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      <Icon name="Cake" size={14} className="mr-1" />
                      {cake.flavor}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Icon name="Weight" size={14} className="mr-1" />
                      {cake.weight}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {cake.filling}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-serif font-bold text-primary">{cake.price} ₽</span>
                    <Dialog open={orderDialogOpen && selectedCake?.id === cake.id} onOpenChange={setOrderDialogOpen}>
                      <DialogTrigger asChild onClick={(e) => { e.stopPropagation(); setSelectedCake(cake); }}>
                        <Button>Заказать</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="font-serif text-2xl">Оформление заказа</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleOrder} className="space-y-4">
                          <div>
                            <Label>Имя</Label>
                            <Input required placeholder="Ваше имя" />
                          </div>
                          <div>
                            <Label>Телефон</Label>
                            <Input required type="tel" placeholder="+7 (___) ___-__-__" />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input type="email" placeholder="your@email.com" />
                          </div>
                          <div>
                            <Label>Комментарий</Label>
                            <Textarea placeholder="Особые пожелания..." />
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Ваш заказ:</p>
                            <p className="font-serif font-semibold text-lg">{selectedCake?.name}</p>
                            <p className="text-2xl font-bold text-primary mt-2">{selectedCake?.price} ₽</p>
                          </div>
                          <Button type="submit" className="w-full" size="lg">
                            Подтвердить заказ
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCakes.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">По выбранным фильтрам ничего не найдено</p>
            </div>
          )}
        </div>
      </section>

      <section id="gallery" className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-12 text-accent">Галерея наших работ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cakes.slice(0, 6).map((cake, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-2xl group cursor-pointer aspect-square animate-scale-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <img 
                  src={cake.image} 
                  alt={cake.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-xl font-serif font-semibold">{cake.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-serif font-bold text-center mb-12 text-accent">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Анна', text: 'Безупречное качество и невероятный вкус! Торт на свадьбу превзошёл все ожидания', rating: 5 },
              { name: 'Дмитрий', text: 'Заказываем торты уже третий год. Всегда свежие, красивые и очень вкусные', rating: 5 },
              { name: 'Елена', text: 'Профессиональный подход и внимание к деталям. Рекомендую всем!', rating: 5 },
              { name: 'Михаил', text: 'Удивили гостей на юбилее. Торт был центром внимания вечера!', rating: 5 },
            ].map((review, idx) => (
              <Card key={idx} className="p-6 animate-fade-in border-0 bg-card/50 backdrop-blur-sm" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center gap-2 mb-3">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-3 italic">"{review.text}"</p>
                <p className="font-semibold">— {review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-5xl font-serif font-bold text-center mb-12 text-accent">Условия доставки</h2>
          <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="Truck" size={24} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Доставка по городу</h3>
                  <p className="text-muted-foreground">Бесплатная доставка при заказе от 3000 ₽. Стандартная доставка — 300 ₽</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={24} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Время доставки</h3>
                  <p className="text-muted-foreground">Доставка в удобное для вас время с 9:00 до 21:00. Предзаказ минимум за 48 часов</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Icon name="Gift" size={24} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Упаковка</h3>
                  <p className="text-muted-foreground">Премиальная упаковка и хладоэлементы для сохранения свежести входят в стоимость</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-5xl font-serif font-bold mb-8 text-accent">Контакты</h2>
          <Card className="p-8 border-0 bg-card/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Icon name="Phone" size={20} className="text-primary" />
                <a href="tel:+79001234567" className="text-lg hover:text-primary transition-colors">+7 (900) 123-45-67</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Mail" size={20} className="text-primary" />
                <a href="mailto:info@confiserie.ru" className="text-lg hover:text-primary transition-colors">info@confiserie.ru</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="MapPin" size={20} className="text-primary" />
                <p className="text-lg">г. Москва, ул. Кондитерская, 15</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Clock" size={20} className="text-primary" />
                <p className="text-lg">Ежедневно с 9:00 до 21:00</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 border-t bg-accent text-accent-foreground">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-serif font-bold mb-2">Confiserie Élégante</h3>
          <p className="text-sm opacity-80">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
