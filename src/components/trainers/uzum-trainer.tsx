"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { TrainerFeedbackOverlay } from "@/components/trainers/trainer-feedback-overlay";
import { CabinetIcon, type CabinetIconName } from "@/components/ui-icons";
import type { UzumTrainer as UzumTrainerData } from "@/data/program";

const validProductIcons: CabinetIconName[] = ["bottle", "cup", "drop", "carton", "package"];

function ProductImage({ image, size = 32 }: { image?: string; size?: number }) {
  const iconName = (image && validProductIcons.includes(image as CabinetIconName))
    ? (image as CabinetIconName)
    : "package";
  return (
    <span className="uzum-product-icon" aria-hidden="true" style={{ width: size, height: size }}>
      <CabinetIcon name={iconName} />
    </span>
  );
}

function Stars({ rating = 0, ratingLabel }: { rating?: number; ratingLabel: string }) {
  const full = Math.floor(rating);
  return (
    <span className="uzum-stars" aria-label={ratingLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "uzum-star uzum-star--on" : "uzum-star"}>★</span>
      ))}
    </span>
  );
}

type Props = {
  trainer: UzumTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "results" | "product" | "cart" | "checkout" | "done";

const dict = {
  ru: {
    cartAria: "Cart",
    crumbSearch: "Search",
    crumbProduct: "Product",
    crumbCart: "Cart",
    crumbOrder: "Order",
    task: "Exercise:",
    filterAll: "All",
    filterDelivery: "Delivery tomorrow",
    filterDiscount: "Discounts",
    filterTopRated: "High rating",
    foundProducts: (n: number) => `Found${n}goods`,
    reviews: (n: number) => `${n}reviews`,
    deliveryDefault: (i: number) => i === 0 ? "Delivery tomorrow, free" : "Delivery in 2 days",
    addToCart: "Add to cart",
    backToResults: "To the results",
    reviewsDetail: (n: number) => `${n}reviews`,
    sellerLabel: "Seller:",
    sellerDefault: "Uzum Market",
    descriptionDefault: "Quality product from a trusted seller. Return within 14 days. Manufacturer's warranty.",
    deliveryDefaultProduct: "Delivery tomorrow, free",
    pickupOrCourier: "To the point of issue or by courier to the door",
    buyNow: "Buy now",
    backToProduct: "Back to product",
    cartOneItem: "Cart · 1 item",
    sellerShort: (s: string) => `Seller:${s}`,
    rowProducts: (n: number) => `Products (${n})`,
    rowDelivery: "Delivery",
    free: "Free",
    total: "Total",
    goToCheckout: "Go to checkout",
    backToCart: "Back to cart",
    checkoutTitle: "Placing an order",
    deliverySection: "Delivery",
    pickupPoint: "Pick-up point",
    pickupAddr: "st. Amira Temura, 16",
    paymentSection: "Payment method",
    payCard: "By card online",
    payCardSub: "UzCard · Humo",
    payCash: "Cash upon receipt",
    payCashSub: "At the point of issue",
    toPay: "For payment",
    confirmOrder: "Confirm order",
    orderDone: "The order has been placed",
    orderNumber: (n: number) => `Order number: UZ-${n}`,
    cartHint: "We will deliver it to the pick-up point tomorrow. You will receive an SMS when you can pick it up.",
    panelTitle: "Select a product",
    question: "Which product is suitable?",
    statusNotChosen: "The product has not yet been selected.",
    statusDone: "The order has been completed.",
    statusInCart: "Item in cart. Place your order.",
    hint: "Look at the title, price and description. Open the card of the desired product.",
    feedbackCorrect: "Right",
    feedbackSoft: "Let's remember",
    next: "Next",
    overlayGood: "Right!",
    overlaySoft: "Not really",
    continue: "Continue",
    starsAria: (rating: number) => `Rating${rating}out of 5`,
  },
  uz: {
    cartAria: "Savatcha",
    crumbSearch: "Qidiruv",
    crumbProduct: "Mahsulot",
    crumbCart: "Savatcha",
    crumbOrder: "Buyurtma",
    task: "Topshiriq:",
    filterAll: "Hammasi",
    filterDelivery: "Ertaga yetkazib berish",
    filterDiscount: "Chegirmalar",
    filterTopRated: "Yuqori reyting",
    foundProducts: (n: number) => `${n} ta mahsulot topildi`,
    reviews: (n: number) => `${n} ta sharh`,
    deliveryDefault: (i: number) => i === 0 ? "Ertaga yetkazib berish, bepul" : "2 kundan keyin yetkazib berish",
    addToCart: "Savatchaga",
    backToResults: "Natijalarga",
    reviewsDetail: (n: number) => `${n} ta sharh`,
    sellerLabel: "Sotuvchi:",
    sellerDefault: "Uzum Market",
    descriptionDefault: "Ishonchli sotuvchidan sifatli mahsulot. 14 kun ichida qaytarish. Ishlab chiqaruvchi kafolati.",
    deliveryDefaultProduct: "Ertaga yetkazib berish, bepul",
    pickupOrCourier: "Olib ketish nuqtasiga yoki kuryer eshikkacha",
    buyNow: "Hozir sotib olish",
    backToProduct: "Mahsulotga qaytish",
    cartOneItem: "Savatcha · 1 ta mahsulot",
    sellerShort: (s: string) => `Sotuvchi: ${s}`,
    rowProducts: (n: number) => `Mahsulotlar (${n})`,
    rowDelivery: "Yetkazib berish",
    free: "Bepul",
    total: "Jami",
    goToCheckout: "Rasmiylashtirishga oʻtish",
    backToCart: "Savatchaga qaytish",
    checkoutTitle: "Buyurtmani rasmiylashtirish",
    deliverySection: "Yetkazib berish",
    pickupPoint: "Olib ketish nuqtasi",
    pickupAddr: "Amir Temur koʻchasi, 16",
    paymentSection: "Toʻlov usuli",
    payCard: "Karta orqali onlayn",
    payCardSub: "UzCard · Humo",
    payCash: "Olganda naqd pul bilan",
    payCashSub: "Olib ketish nuqtasida",
    toPay: "Toʻlash",
    confirmOrder: "Buyurtmani tasdiqlash",
    orderDone: "Buyurtma rasmiylashtirildi",
    orderNumber: (n: number) => `Buyurtma raqami: UZ-${n}`,
    cartHint: "Ertaga olib ketish nuqtasiga yetkazib beramiz. Olib ketishingiz mumkin boʻlganda SMS keladi.",
    panelTitle: "Mahsulot tanla",
    question: "Qaysi mahsulot toʻgʻri keladi?",
    statusNotChosen: "Mahsulot hali tanlanmagan.",
    statusDone: "Buyurtma rasmiylashtirildi.",
    statusInCart: "Mahsulot savatchada. Buyurtma ber.",
    hint: "Nomi, narxi va tavsifiga qara. Kerakli mahsulot kartochkasini och.",
    feedbackCorrect: "Toʻgʻri",
    feedbackSoft: "Esda tutaylik",
    next: "Davom etish",
    overlayGood: "Toʻgʻri!",
    overlaySoft: "Toʻliq emas",
    continue: "Davom etish",
    starsAria: (rating: number) => `Reyting: 5 dan ${rating}`,
  },
} as const;

export function UzumTrainer({ trainer, onDone, studentMode = false }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const [step, setStep] = useState<Step>("results");
  const [picked, setPicked] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [payMethod, setPayMethod] = useState<"card" | "cash">("card");
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [feedback, setFeedback] = useState<string | null>(null);

  function pickProduct(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setStep("product");
  }

  function addToCart() {
    setStep("cart");
  }

  function goToCheckout() {
    setStep("checkout");
  }

  function placeOrder() {
    setStep("done");
    const product = picked !== null ? trainer.products[picked] : null;
    setTimeout(() => {
      setFeedback(product?.correct ? trainer.feedbackCorrect : trainer.feedbackWrong);
    }, 600);
  }

  const product = picked !== null ? trainer.products[picked] : null;
  const correct = Boolean(product?.correct);

  const panelAnswers: StudentTaskPanelAnswer[] = trainer.products.map((item, index) => {
    const answered = picked !== null;
    const selected = picked === index;
    return {
      id: `product-${index}`,
      text: item.name,
      detail: item.price,
      state: answered
        ? item.correct
          ? "correct"
          : selected
            ? "wrong"
            : "muted"
        : "idle",
      disabled: answered,
      onClick: () => pickProduct(index),
    };
  });

  const totalPrice = product
    ? formatPrice(product.price, qty)
    : "";

  const marketFrame = (
    <div className="uzum-phone">
      {/* Top bar with logo, search, cart */}
      <div className="uzum-topbar">
        <span className="uzum-logo">uzum</span>
        <div className="uzum-search-bar">
          <span className="uzum-search-icon" aria-hidden="true">
            <CabinetIcon name="search" />
          </span>
          <input type="text" value={trainer.searchQuery} readOnly />
        </div>
        <button type="button" className="uzum-cart-btn" aria-label={t.cartAria}>
          <CabinetIcon name="package" />
          {step !== "results" && step !== "product" ? <span className="uzum-cart-badge">1</span> : null}
        </button>
      </div>

      {/* Breadcrumb / step indicator */}
      <div className="uzum-breadcrumb">
        <span className={step === "results" ? "active" : ""}>{t.crumbSearch}</span>
        <span aria-hidden="true">›</span>
        <span className={step === "product" ? "active" : ""}>{t.crumbProduct}</span>
        <span aria-hidden="true">›</span>
        <span className={step === "cart" ? "active" : ""}>{t.crumbCart}</span>
        <span aria-hidden="true">›</span>
        <span className={step === "checkout" || step === "done" ? "active" : ""}>{t.crumbOrder}</span>
      </div>

      {!studentMode && step === "results" ? (
        <div className="uzum-task-bar">
          <strong>{t.task}</strong> {trainer.task}
        </div>
      ) : null}

      {/* Step 1: search results */}
      {step === "results" ? (
        <>
          <div className="uzum-filters">
            <button type="button" className="uzum-filter-chip active">{t.filterAll}</button>
            <button type="button" className="uzum-filter-chip">{t.filterDelivery}</button>
            <button type="button" className="uzum-filter-chip">{t.filterDiscount}</button>
            <button type="button" className="uzum-filter-chip">{t.filterTopRated}</button>
          </div>
          <div className="uzum-results-meta">
            {t.foundProducts(trainer.products.length)}
          </div>
          <div className="uzum-results">
            {trainer.products.map((p, i) => (
              <button
                key={i}
                type="button"
                className="uzum-product"
                onClick={() => pickProduct(i)}
              >
                <div className="uzum-product-image">
                  <ProductImage image={p.image} size={48} />
                </div>
                <div className="uzum-product-info">
                  <strong>{p.name}</strong>
                  <div className="uzum-product-prices">
                    <span className="uzum-product-price">{p.price}</span>
                    {p.oldPrice ? <span className="uzum-product-oldprice">{p.oldPrice}</span> : null}
                  </div>
                  <div className="uzum-product-rating-line">
                    <Stars rating={p.rating ?? 4} ratingLabel={t.starsAria(p.rating ?? 4)} />
                    <span className="uzum-product-reviews">{t.reviews(p.reviewCount ?? Math.floor(20 + i * 17))}</span>
                  </div>
                  <span className="uzum-product-delivery">
                    {p.delivery ?? t.deliveryDefault(i)}
                  </span>
                </div>
                <span className="uzum-product-cta">{t.addToCart}</span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {/* Step 2: product detail */}
      {step === "product" && product ? (
        <div className="uzum-product-detail">
          <button type="button" className="uzum-back-btn" onClick={() => { setStep("results"); setPicked(null); }}>
<CabinetIcon name="chevron-left" /><span>{t.backToResults}</span>
          </button>
          <div className="uzum-product-hero">
            <ProductImage image={product.image} size={96} />
          </div>
          <h3 className="uzum-product-title">{product.name}</h3>
          <div className="uzum-product-rating-line">
            <Stars rating={product.rating ?? 4} ratingLabel={t.starsAria(product.rating ?? 4)} />
            <span className="uzum-product-reviews">{t.reviewsDetail(product.reviewCount ?? 42)}</span>
          </div>
          <div className="uzum-product-prices uzum-product-prices--big">
            <span className="uzum-product-price">{product.price}</span>
            {product.oldPrice ? <span className="uzum-product-oldprice">{product.oldPrice}</span> : null}
          </div>
          {product.seller ? (
            <p className="uzum-product-seller">{t.sellerLabel} <strong>{product.seller}</strong></p>
          ) : (
            <p className="uzum-product-seller">{t.sellerLabel} <strong>{t.sellerDefault}</strong></p>
          )}
          <p className="uzum-product-description">
            {product.description ?? t.descriptionDefault}
          </p>
          <div className="uzum-product-delivery-box">
            <CabinetIcon name="package" />
            <div>
              <strong>{product.delivery ?? t.deliveryDefaultProduct}</strong>
              <small>{t.pickupOrCourier}</small>
            </div>
          </div>
          <div className="uzum-product-actions">
            <button type="button" className="uzum-add-cart" onClick={addToCart}>
              {t.addToCart}
            </button>
            <button type="button" className="uzum-buy-now" onClick={() => { addToCart(); setTimeout(goToCheckout, 100); }}>
              {t.buyNow}
            </button>
          </div>
        </div>
      ) : null}

      {/* Step 3: cart */}
      {step === "cart" && product ? (
        <div className="uzum-cart">
          <button type="button" className="uzum-back-btn" onClick={() => setStep("product")}>
<CabinetIcon name="chevron-left" /><span>{t.backToProduct}</span>
          </button>
          <p className="uzum-cart-title">{t.cartOneItem}</p>
          <div className="uzum-cart-item">
            <div className="uzum-product-image">
              <ProductImage image={product.image} size={48} />
            </div>
            <div className="uzum-cart-item-info">
              <strong>{product.name}</strong>
              <span className="uzum-product-price">{product.price}</span>
              {product.seller ? <small>{t.sellerShort(product.seller)}</small> : null}
            </div>
            <div className="uzum-cart-qty">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
          <div className="uzum-cart-summary">
            <div className="uzum-cart-row">
              <span>{t.rowProducts(qty)}</span>
              <span>{totalPrice}</span>
            </div>
            <div className="uzum-cart-row">
              <span>{t.rowDelivery}</span>
              <span>{t.free}</span>
            </div>
            <div className="uzum-cart-row uzum-cart-row--total">
              <strong>{t.total}</strong>
              <strong>{totalPrice}</strong>
            </div>
          </div>
          <button type="button" className="uzum-checkout" onClick={goToCheckout}>
            {t.goToCheckout}
          </button>
        </div>
      ) : null}

      {/* Step 4: checkout */}
      {step === "checkout" && product ? (
        <div className="uzum-checkout-step">
          <button type="button" className="uzum-back-btn" onClick={() => setStep("cart")}>
<CabinetIcon name="chevron-left" /><span>{t.backToCart}</span>
          </button>
          <p className="uzum-cart-title">{t.checkoutTitle}</p>

          <div className="uzum-checkout-block">
            <p className="uzum-checkout-label">{t.deliverySection}</p>
            <div className="uzum-checkout-row">
              <CabinetIcon name="package" />
              <div>
                <strong>{t.pickupPoint}</strong>
                <small>{t.pickupAddr}</small>
              </div>
            </div>
          </div>

          <div className="uzum-checkout-block">
            <p className="uzum-checkout-label">{t.paymentSection}</p>
            <button
              type="button"
              className={`uzum-pay-method${payMethod === "card" ? " active" : ""}`}
              onClick={() => setPayMethod("card")}
            >
              <span className="uzum-pay-dot" />
              <span>{t.payCard}</span>
              <small>{t.payCardSub}</small>
            </button>
            <button
              type="button"
              className={`uzum-pay-method${payMethod === "cash" ? " active" : ""}`}
              onClick={() => setPayMethod("cash")}
            >
              <span className="uzum-pay-dot" />
              <span>{t.payCash}</span>
              <small>{t.payCashSub}</small>
            </button>
          </div>

          <div className="uzum-cart-summary">
            <div className="uzum-cart-row uzum-cart-row--total">
              <strong>{t.toPay}</strong>
              <strong>{totalPrice}</strong>
            </div>
          </div>

          <button type="button" className="uzum-checkout" onClick={placeOrder}>
            {t.confirmOrder}
          </button>
        </div>
      ) : null}

      {/* Step 5: order confirmation */}
      {step === "done" && product ? (
        <div className="uzum-order-done">
          <div className="uzum-order-icon" aria-hidden="true">
            <CabinetIcon name="check" />
          </div>
          <strong>{t.orderDone}</strong>
          <small>{t.orderNumber(orderNumber)}</small>
          <p className="uzum-order-summary-line">
            {qty} × {product.name} · {totalPrice}
          </p>
          <small className="uzum-cart-hint">
            {t.cartHint}
          </small>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={`uzum-trainer${studentMode ? " student-trainer-workspace" : ""}`}>
      {studentMode ? <div className="student-trainer-surface">{marketFrame}</div> : marketFrame}

      {studentMode ? (
        <StudentTaskPanel
          title={t.panelTitle}
          instruction={trainer.task}
          question={t.question}
          status={
            step === "results"
              ? t.statusNotChosen
              : step === "done"
                ? t.statusDone
                : t.statusInCart
          }
          answers={panelAnswers}
          hint={t.hint}
          feedback={
            feedback
              ? {
                  tone: correct ? "good" : "soft",
                  title: correct ? t.feedbackCorrect : t.feedbackSoft,
                  text: feedback,
                }
              : null
          }
          primaryAction={
            feedback
              ? {
                  label: t.next,
                  onClick: () => onDone({ correct }),
                }
              : undefined
          }
        />
      ) : null}

      {feedback && !studentMode ? (
        <TrainerFeedbackOverlay
          tone={correct ? "good" : "soft"}
          title={correct ? t.overlayGood : t.overlaySoft}
          text={feedback}
          actionLabel={t.continue}
          onAction={() => onDone({ correct })}
        />
      ) : null}
    </div>
  );
}

function formatPrice(price: string, qty: number): string {
  if (qty === 1) return price;
  const numMatch = price.match(/[\d\s.,]+/);
  if (!numMatch) return price;
  const cleanNum = parseFloat(numMatch[0].replace(/\s/g, "").replace(",", "."));
  if (isNaN(cleanNum)) return price;
  const total = cleanNum * qty;
  const formatted = total.toLocaleString("ru-RU", { maximumFractionDigits: 0 }).replace(/,/g, " ");
  const suffix = price.replace(numMatch[0], "").trim();
  return `${formatted} ${suffix}`.trim();
}
