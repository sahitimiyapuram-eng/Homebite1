import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { GroceryItem } from '../types';
import { useBrowserBackModal } from '../hooks/useBrowserBackModal';

interface GroceryViewProps {
  items: GroceryItem[];
  onToggleCheck: (id: string) => void;
  onAddItem: (item: Omit<GroceryItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
  isDarkMode: boolean;
}

export const GroceryView: React.FC<GroceryViewProps> = ({
  items,
  onToggleCheck,
  onAddItem,
  onDeleteItem,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'this-week' | 'next-week'>('this-week');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'Vegetables' | 'Others'>('Vegetables');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState('Blinkit (10 mins)');

  // Close order checkout modal when browser back is pressed
  useBrowserBackModal(showOrderModal, () => setShowOrderModal(false), 'grocery-checkout');

  const vegetables = items.filter((i) => i.category === 'Vegetables');
  const others = items.filter((i) => i.category !== 'Vegetables');

  // Calculate estimated cost from checked items
  const totalCost = items.reduce((sum, item) => sum + (item.checked ? item.price : 0), 0);

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onAddItem({
      name: newItemName.trim(),
      quantity: newItemQty.trim() || '1 pack',
      category: newItemCategory,
      checked: true,
      price: Math.floor(Math.random() * 80) + 30,
    });
    setNewItemName('');
    setNewItemQty('');
  };

  const handleConfirmOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      // Auto close after 3 seconds
      setTimeout(() => {
        setOrderPlaced(false);
        setShowOrderModal(false);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs matching Screen 10 */}
      <div className={`p-6 rounded-3xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#AE7C53]">
            Smart Pantry Management
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#4B2E25] dark:text-[#FFFBF0] flex items-center gap-2 mt-0.5">
            <ShoppingBag size={22} className="text-[#AE7C53]" />
            <span>Grocery List</span>
          </h2>
          <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] mt-1">
            Auto-generated from your weekly meal recipes for Priya to cook
          </p>
        </div>

        {/* Tab pills */}
        <div className={`p-1 rounded-xl border flex items-center gap-1 ${
          isDarkMode
            ? 'bg-[#1E1512] border-[#3D2C26]'
            : 'bg-[#FFFBF0] border-[#E8D9CD]'
        }`}>
          <button
            onClick={() => setActiveTab('this-week')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'this-week'
                ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-[#FFFBF0] shadow-xs'
                : 'text-[#6F4E37] dark:text-[#DEB89D] hover:text-[#4B2E25]'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setActiveTab('next-week')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'next-week'
                ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-[#FFFBF0] shadow-xs'
                : 'text-[#6F4E37] dark:text-[#DEB89D] hover:text-[#4B2E25]'
            }`}
          >
            Next Week
          </button>
        </div>
      </div>

      {/* Main Checklist Card */}
      <div className={`p-6 rounded-3xl border transition-colors ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        {/* Section 1: Vegetables */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0] flex items-center gap-2">
              <span>Vegetables</span>
              <span className="text-xs font-normal text-[#AE7C53]">({vegetables.length} items)</span>
            </h3>
            <span className="text-xs text-[#AE7C53] font-mono">Fresh Harvest</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {vegetables.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleCheck(item.id)}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  item.checked
                    ? isDarkMode
                      ? 'bg-[#1E1512] border-[#AE7C53]/40 text-[#FFFBF0]'
                      : 'bg-[#FFFBF0] border-[#AE7C53]/40 text-[#4B2E25]'
                    : isDarkMode
                      ? 'bg-[#18110E] border-[#3D2C26]/50 text-[#DEB89D]/60 opacity-60'
                      : 'bg-[#F5ECE5] border-[#E8D9CD]/50 text-[#6F4E37]/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    item.checked
                      ? 'bg-[#4B2E25] dark:bg-[#AE7C53] border-transparent text-white'
                      : 'border-[#AE7C53]/40 bg-transparent'
                  }`}>
                    {item.checked && <Check size={13} className="stroke-3" />}
                  </div>
                  <span className={`text-sm font-medium ${item.checked ? '' : 'line-through'}`}>
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#AE7C53] font-semibold">
                    {item.quantity}
                  </span>
                  <span className="text-xs font-mono text-[#6F4E37] dark:text-[#DEB89D]">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(item.id);
                    }}
                    className="p-1 text-[#AE7C53]/50 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Others / Staples */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0] flex items-center gap-2">
              <span>Others &amp; Staples</span>
              <span className="text-xs font-normal text-[#AE7C53]">({others.length} items)</span>
            </h3>
            <span className="text-xs text-[#AE7C53] font-mono">Pantry Essentials</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {others.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleCheck(item.id)}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  item.checked
                    ? isDarkMode
                      ? 'bg-[#1E1512] border-[#AE7C53]/40 text-[#FFFBF0]'
                      : 'bg-[#FFFBF0] border-[#AE7C53]/40 text-[#4B2E25]'
                    : isDarkMode
                      ? 'bg-[#18110E] border-[#3D2C26]/50 text-[#DEB89D]/60 opacity-60'
                      : 'bg-[#F5ECE5] border-[#E8D9CD]/50 text-[#6F4E37]/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    item.checked
                      ? 'bg-[#4B2E25] dark:bg-[#AE7C53] border-transparent text-white'
                      : 'border-[#AE7C53]/40 bg-transparent'
                  }`}>
                    {item.checked && <Check size={13} className="stroke-3" />}
                  </div>
                  <span className={`text-sm font-medium ${item.checked ? '' : 'line-through'}`}>
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#AE7C53] font-semibold">
                    {item.quantity}
                  </span>
                  <span className="text-xs font-mono text-[#6F4E37] dark:text-[#DEB89D]">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(item.id);
                    }}
                    className="p-1 text-[#AE7C53]/50 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Custom Ingredient Form */}
        <form onSubmit={handleAddNew} className="p-4 rounded-2xl border border-dashed border-[#AE7C53]/40 mb-8 bg-black/2 dark:bg-white/2">
          <div className="flex items-center gap-2 mb-2">
            <Plus size={14} className="text-[#AE7C53]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#AE7C53]">
              Add Extra Ingredient / Custom Item
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="Item name (e.g., Ginger, Ghee, Brown Rice)"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className={`sm:col-span-2 px-3 py-2 rounded-xl text-xs border outline-none ${
                isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-[#FFFBF0] border-[#E8D9CD]'
              }`}
            />
            <input
              type="text"
              placeholder="Qty (e.g. 500 g, 1 bottle)"
              value={newItemQty}
              onChange={(e) => setNewItemQty(e.target.value)}
              className={`px-3 py-2 rounded-xl text-xs border outline-none ${
                isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-[#FFFBF0] border-[#E8D9CD]'
              }`}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#AE7C53] hover:bg-[#976841] text-white transition-colors cursor-pointer"
            >
              Add Item
            </button>
          </div>
        </form>

        {/* Bottom Total & Order Ingredients Bar matching Screen 10 */}
        <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-[#FFFBF0] border-[#E8D9CD]'
        }`}>
          <div>
            <span className="text-xs text-[#AE7C53] uppercase font-semibold tracking-wider">
              Estimated Total Cost
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold font-mono text-[#4B2E25] dark:text-[#FFFBF0]">
                ₹ {totalCost.toLocaleString()}
              </span>
              <span className="text-xs text-[#6F4E37] dark:text-[#DEB89D]">
                ({items.filter((i) => i.checked).length} items selected)
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowOrderModal(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Truck size={16} />
            <span>Order Ingredients</span>
          </button>
        </div>
      </div>

      {/* Interactive Order Ingredients Checkout Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
            isDarkMode
              ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
              : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
          }`}>
            <button
              onClick={() => {
                setShowOrderModal(false);
                setOrderPlaced(false);
              }}
              className="absolute top-5 right-5 p-1 rounded-full text-[#AE7C53] hover:bg-black/10 cursor-pointer"
            >
              <X size={18} />
            </button>

            {!orderPlaced ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase font-semibold text-[#AE7C53] tracking-wider">
                    Instant Grocery Integration
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  Confirm Instant Grocery Order
                </h3>

                {/* Delivery Address */}
                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 mb-4 flex items-start gap-3">
                  <MapPin size={18} className="text-[#AE7C53] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                      Delivery to Kanika Suthar
                    </p>
                    <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D]">
                      Flat 402, Green Glen Layout, Bellandur, Bangalore - 560103
                    </p>
                    <p className="text-[11px] text-[#AE7C53] mt-1 flex items-center gap-1 font-medium">
                      <Clock size={12} />
                      <span>Arrives before Priya begins morning meal prep</span>
                    </p>
                  </div>
                </div>

                {/* Delivery Partner Selection */}
                <p className="text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-2">
                  Choose Partner (Fastest Dispatch)
                </p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {['Blinkit (10 mins)', 'Zepto (12 mins)', 'Swiggy Instamart', 'BigBasket BB Now'].map((partner) => (
                    <button
                      key={partner}
                      onClick={() => setSelectedPartner(partner)}
                      className={`p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                        selectedPartner === partner
                          ? 'border-[#AE7C53] bg-[#AE7C53]/15 text-[#4B2E25] dark:text-[#FFFBF0] font-bold'
                          : 'border-[#E8D9CD] dark:border-[#3D2C26] opacity-75'
                      }`}
                    >
                      {partner}
                    </button>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-1 text-xs mb-6 font-mono">
                  <div className="flex justify-between">
                    <span>Selected Ingredients ({items.filter((i) => i.checked).length} items):</span>
                    <span>₹ {totalCost}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Homebite Cook Partnership Discount:</span>
                    <span>- ₹ 40</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-black/10 dark:border-white/10 text-sm">
                    <span>Net Payable:</span>
                    <span>₹ {Math.max(0, totalCost - 40)}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  <span>Place Order via {selectedPartner.split(' ')[0]}</span>
                </button>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <Check size={32} className="stroke-3" />
                </div>
                <h3 className="text-2xl font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] max-w-xs mx-auto leading-relaxed">
                  Ingredients are on their way via {selectedPartner}. Priya has been notified with the recipe prep list!
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#AE7C53]/15 text-[#AE7C53] text-xs font-semibold">
                  <span>Estimated Delivery: 12 Minutes</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
