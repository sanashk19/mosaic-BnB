"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { StudentTaskPanel, type StudentTaskPanelAnswer } from "@/components/student-task-panel";
import { TrainerFeedbackOverlay } from "@/components/trainers/trainer-feedback-overlay";
import { CabinetIcon, type CabinetIconName } from "@/components/ui-icons";
import type { YandexMarketTrainer as YandexMarketTrainerData } from "@/data/program";

const validProductIcons: CabinetIconName[] = ["bottle", "cup", "drop", "carton", "package"];

function ProductImage({ image, size = 32 }: { image?: string; size?: number }) {
  const iconName = (image && validProductIcons.includes(image as CabinetIconName))
    ? (image as CabinetIconName)
    : "package";
  return (
    <span className="ym-product-icon" aria-hidden="true" style={{ width: size, height: size }}>
      <CabinetIcon name={iconName} />
    </span>
  );
}

function Stars({ rating = 0, ratingLabel }: { rating?: number; ratingLabel: string }) {
  const full = Math.floor(rating);
  return (
    <span className="ym-stars" aria-label={ratingLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "ym-star ym-star--on" : "ym-star"}>★</span>
      ))}
    </span>
  );
}

type Props = {
  trainer: YandexMarketTrainerData;
  onDone: (chosen: { correct: boolean }) => void;
  studentMode?: boolean;
};

type Step = "results" | "product" | "delivery" | "checkout" | "done";

const dict = {
  ru: {
    logoSuffix: "Market",
    tabCatalog: "Catalog",
    tabFavorites: "Favorites",
    tabOrders: "Orders",
    task: "Exercise:",
    filterAll: "All",
    filterDelivery: "Delivery tomorrow",
    filterCashback: "With cashback",
    filterPrice: "Up to 30,000 soum",
    offersCount: (n: number) => `${n}proposals`,
    favoriteAria: "Add to favorites",
    cashbackPrefix: "Cashback",
    cashbackDefault: "Cashback 5%",
    deliveryDefault: (i: number) => i === 0 ? "Delivery tomorrow" : "In 2 days",
    addToCart: "Add to cart",
    backToCatalog: "To catalog",
    reviewsLabel: (n: number) => `${n}ratings`,
    sellerLabel: "Seller:",
    sellerDefault: "Online Store",
    descriptionDefault: "Product with seller's warranty. Return within 7 days. Orders are delivered by courier or to a pick-up point.",
    buyFor: (p: string) => `Buy for${p}`,
    backToProduct: "To product",
    deliveryTitle: "Where to deliver?",
    pickupTitle: "Pick-up point",
    pickupSub: "st. Shakhrisabz, 24 · ready tomorrow · free",
    courierTitle: "Courier to door",
    courierSub: "Tomorrow 10:00–14:00 · 15,000 soum",
    next: "Next",
    backLabel: "Back",
    confirmTitle: "Confirmation",
    deliveryLabel: "Delivery",
    pickupAddr: "Pick-up point · st. Shakhrisabz, 24",
    courierAddr: "Courier to door tomorrow",
    free: "Free",
    courierCost: "+ 15,000 sum",
    paymentLabel: "Payment",
    paymentMethod: "Yandex Pay · card •• 4827",
    total: "Total payable",
    placeOrder: "Place an order",
    orderDone: "The order has been placed",
    hintPickup: "Ready tomorrow at the pick-up point. You will receive an SMS when you can pick it up.",
    hintCourier: "The courier will deliver tomorrow. Will call an hour before delivery.",
    panelTitle: "Select a product",
    question: "Which product is suitable?",
    statusNotChosen: "The product has not yet been selected.",
    statusDone: "The order has been completed.",
    statusInProgress: "Product selected. Place your order.",
    hint: "Open the card of the desired product and go through the steps to checkout.",
    feedbackCorrect: "Right",
    feedbackSoft: "Let's remember",
    nextAction: "Next",
    overlayGood: "Right!",
    overlaySoft: "Not really",
    continue: "Continue",
    starsAria: (rating: number) => `${rating}out of 5`,
  },
  uz: {
    logoSuffix: "Market",
    tabCatalog: "Katalog",
    tabFavorites: "Saralangan",
    tabOrders: "Buyurtmalarim",
    task: "Topshiriq:",
    filterAll: "Hammasi",
    filterDelivery: "Ertaga yetkazib berish",
    filterCashback: "Keshbek bilan",
    filterPrice: "30 000 soʻmgacha",
    offersCount: (n: number) => `${n} ta taklif`,
    favoriteAria: "Saralanganga qoʻshish",
    cashbackPrefix: "Keshbek",
    cashbackDefault: "Keshbek 5%",
    deliveryDefault: (i: number) => i === 0 ? "Ertaga yetkazib berish" : "2 kundan keyin",
    addToCart: "Savatchaga",
    backToCatalog: "Katalogga",
    reviewsLabel: (n: number) => `${n} ta baho`,
    sellerLabel: "Sotuvchi:",
    sellerDefault: "Yandex Market",
    descriptionDefault: "Sotuvchi kafolati bilan mahsulot. 7 kun ichida qaytarish. Buyurtmalar kuryer yoki olib ketish nuqtasiga yetkazib beriladi.",
    buyFor: (p: string) => `${p} ga sotib olish`,
    backToProduct: "Mahsulotga",
    deliveryTitle: "Qayerga yetkazib berilsin?",
    pickupTitle: "Olib ketish nuqtasi",
    pickupSub: "Shahrisabz koʻchasi, 24 · ertaga tayyor · bepul",
    courierTitle: "Kuryer eshikkacha",
    courierSub: "Ertaga 10:00–14:00 · 15 000 soʻm",
    next: "Davom etish",
    backLabel: "Orqaga",
    confirmTitle: "Tasdiqlash",
    deliveryLabel: "Yetkazib berish",
    pickupAddr: "Olib ketish nuqtasi · Shahrisabz koʻchasi, 24",
    courierAddr: "Kuryer eshikkacha · ertaga",
    free: "Bepul",
    courierCost: "+ 15 000 soʻm",
    paymentLabel: "Toʻlov",
    paymentMethod: "Yandex Pay · karta •• 4827",
    total: "Jami toʻlanadi",
    placeOrder: "Buyurtma berish",
    orderDone: "Buyurtma rasmiylashtirildi",
    hintPickup: "Ertaga olib ketish nuqtasida tayyor boʻladi. Olib ketishingiz mumkin boʻlganda SMS keladi.",
    hintCourier: "Kuryer ertaga olib keladi. Yetkazib berishdan bir soat oldin qoʻngʻiroq qiladi.",
    panelTitle: "Mahsulot tanla",
    question: "Qaysi mahsulot toʻgʻri keladi?",
    statusNotChosen: "Mahsulot hali tanlanmagan.",
    statusDone: "Buyurtma rasmiylashtirildi.",
    statusInProgress: "Mahsulot tanlandi. Buyurtma ber.",
    hint: "Kerakli mahsulot kartochkasini ochib, rasmiylashtirishgacha boʻlgan bosqichlarni bajar.",
    feedbackCorrect: "Toʻgʻri",
    feedbackSoft: "Esda tutaylik",
    nextAction: "Davom etish",
    overlayGood: "Toʻgʻri!",
    overlaySoft: "Toʻliq emas",
    continue: "Davom etish",
    starsAria: (rating: number) => `5 dan ${rating}`,
  },
} as const;

export function YandexMarketTrainer({ trainer, onDone, studentMode = false }: Props) {
  const locale = useLocale();
  const t = dict[locale];
  const [step, setStep] = useState<Step>("results");
  const [picked, setPicked] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [deliveryType, setDeliveryType] = useState<"pickup" | "courier">("pickup");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));

  function pickProduct(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setStep("product");
  }

  function toggleFav(i: number, e: React.MouseEvent) {
    e.stopPropagation();
    setFavorites((cur) => {
      const next = new Set(cur);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }

  const product = picked !== null ? trainer.products[picked] : null;
  const correct = Boolean(product?.correct);

  function placeOrder() {
    setStep("done");
    setTimeout(() => {
      setFeedback(product?.correct ? trainer.feedbackCorrect : trainer.feedbackWrong);
    }, 700);
  }

  const panelAnswers: StudentTaskPanelAnswer[] = trainer.products.map((item, index) => {
    const answered = picked !== null;
    const selected = picked === index;
    return {
      id: `ym-product-${index}`,
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

  const marketFrame = (
    <div className="ym-phone">
      {/* Header */}
      <div className="ym-header">
        <span className="ym-logo">
          <span className="ym-logo-y">I</span>{t.logoSuffix}
        </span>
        <div className="ym-search-bar">
          <input type="text" value={trainer.searchQuery} readOnly />
          <button type="button" className="ym-search-btn" aria-hidden="true">
            <CabinetIcon name="search" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="ym-tabs">
        <button type="button" className="ym-tab active">{t.tabCatalog}</button>
        <button type="button" className="ym-tab">
          {t.tabFavorites}
          {favorites.size > 0 ? <span className="ym-tab-count">{favorites.size}</span> : null}
        </button>
        <button type="button" className="ym-tab">{t.tabOrders}</button>
      </div>

      {!studentMode && step === "results" ? (
        <div className="ym-task-bar">
          <strong>{t.task}</strong> {trainer.task}
        </div>
      ) : null}

      {/* Step 1: results grid */}
      {step === "results" ? (
        <>
          <div className="ym-filters">
            <button type="button" className="ym-filter-chip active">{t.filterAll}</button>
            <button type="button" className="ym-filter-chip">{t.filterDelivery}</button>
            <button type="button" className="ym-filter-chip">{t.filterCashback}</button>
            <button type="button" className="ym-filter-chip">{t.filterPrice}</button>
          </div>
          <div className="ym-results-meta">{t.offersCount(trainer.products.length)}</div>
          <div className="ym-results">
            {trainer.products.map((p, i) => (
              <div key={i} className="ym-product-wrap">
                <button
                  type="button"
                  className="ym-fav-btn"
                  onClick={(e) => toggleFav(i, e)}
                  aria-label={t.favoriteAria}
                >
                  <CabinetIcon name={favorites.has(i) ? "heart-filled" : "heart"} />
                </button>
                <button
                  type="button"
                  className="ym-product"
                  onClick={() => pickProduct(i)}
                >
                  <div className="ym-product-image">
                    <ProductImage image={p.image} size={48} />
                  </div>
                  <div className="ym-product-info">
                    <strong>{p.name}</strong>
                    <div className="ym-product-prices">
                      <span className="ym-product-price">{p.price}</span>
                      {p.oldPrice ? <span className="ym-product-oldprice">{p.oldPrice}</span> : null}
                    </div>
                    <div className="ym-product-rating-line">
                      <Stars rating={p.rating ?? 4} ratingLabel={t.starsAria(p.rating ?? 4)} />
                      <span className="ym-product-reviews">{p.reviewCount ?? 50 + i * 23}</span>
                    </div>
                    {p.cashback ? (
                      <span className="ym-cashback">{t.cashbackPrefix} {p.cashback}</span>
                    ) : i === 0 ? (
                      <span className="ym-cashback">{t.cashbackDefault}</span>
                    ) : null}
                    <span className="ym-product-delivery">
                      {p.delivery ?? t.deliveryDefault(i)}
                    </span>
                  </div>
                  <span className="ym-product-cta">{t.addToCart}</span>
                </button>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {/* Step 2: product detail */}
      {step === "product" && product ? (
        <div className="ym-product-detail">
          <button type="button" className="ym-back-btn" onClick={() => { setStep("results"); setPicked(null); }}>
            <CabinetIcon name="chevron-left" />
            <span>{t.backToCatalog}</span>
          </button>
          <div className="ym-product-hero">
            <ProductImage image={product.image} size={96} />
          </div>
          <h3 className="ym-product-title">{product.name}</h3>
          <div className="ym-product-rating-line">
            <Stars rating={product.rating ?? 4} ratingLabel={t.starsAria(product.rating ?? 4)} />
            <span className="ym-product-reviews">{t.reviewsLabel(product.reviewCount ?? 60)}</span>
          </div>
          <div className="ym-product-prices ym-product-prices--big">
            <span className="ym-product-price">{product.price}</span>
            {product.oldPrice ? <span className="ym-product-oldprice">{product.oldPrice}</span> : null}
            {product.cashback ? <span className="ym-cashback">{t.cashbackPrefix} {product.cashback}</span> : null}
          </div>
          <p className="ym-product-seller">
            {t.sellerLabel} <strong>{product.seller ?? t.sellerDefault}</strong>
          </p>
          <p className="ym-product-description">
            {product.description ?? t.descriptionDefault}
          </p>
          <div className="ym-product-actions">
            <button type="button" className="ym-add-cart" onClick={() => setStep("delivery")}>
              {t.buyFor(product.price)}
            </button>
          </div>
        </div>
      ) : null}

      {/* Step 3: delivery */}
      {step === "delivery" && product ? (
        <div className="ym-delivery">
          <button type="button" className="ym-back-btn" onClick={() => setStep("product")}>
<CabinetIcon name="chevron-left" /><span>{t.backToProduct}</span>
          </button>
          <p className="ym-cart-title">{t.deliveryTitle}</p>

          <button
            type="button"
            className={`ym-delivery-option${deliveryType === "pickup" ? " active" : ""}`}
            onClick={() => setDeliveryType("pickup")}
          >
            <span className="ym-pay-dot" />
            <div>
              <strong>{t.pickupTitle}</strong>
              <small>{t.pickupSub}</small>
            </div>
          </button>
          <button
            type="button"
            className={`ym-delivery-option${deliveryType === "courier" ? " active" : ""}`}
            onClick={() => setDeliveryType("courier")}
          >
            <span className="ym-pay-dot" />
            <div>
              <strong>{t.courierTitle}</strong>
              <small>{t.courierSub}</small>
            </div>
          </button>

          <button type="button" className="ym-checkout" onClick={() => setStep("checkout")}>
            {t.next}
          </button>
        </div>
      ) : null}

      {/* Step 4: checkout */}
      {step === "checkout" && product ? (
        <div className="ym-checkout-step">
          <button type="button" className="ym-back-btn" onClick={() => setStep("delivery")}>
<CabinetIcon name="chevron-left" /><span>{t.backLabel}</span>
          </button>
          <p className="ym-cart-title">{t.confirmTitle}</p>

          <div className="ym-summary-box">
            <div className="ym-summary-row">
              <ProductImage image={product.image} size={40} />
              <div>
                <strong>{product.name}</strong>
                <small>{product.seller ?? t.sellerDefault}</small>
              </div>
              <span className="ym-product-price">{product.price}</span>
            </div>
          </div>

          <div className="ym-summary-box">
            <p className="ym-checkout-label">{t.deliveryLabel}</p>
            <p>
              {deliveryType === "pickup" ? t.pickupAddr : t.courierAddr}
            </p>
            <p className="ym-summary-cost">
              {deliveryType === "pickup" ? t.free : t.courierCost}
            </p>
          </div>

          <div className="ym-summary-box">
            <p className="ym-checkout-label">{t.paymentLabel}</p>
            <p>{t.paymentMethod}</p>
          </div>

          <div className="ym-summary-box ym-summary-box--total">
            <strong>{t.total}</strong>
            <strong>{product.price}</strong>
          </div>

          <button type="button" className="ym-checkout" onClick={placeOrder}>
            {t.placeOrder}
          </button>
        </div>
      ) : null}

      {/* Step 5: done */}
      {step === "done" && product ? (
        <div className="ym-order-done">
          <div className="ym-order-icon" aria-hidden="true">
            <CabinetIcon name="check" />
          </div>
          <strong>{t.orderDone}</strong>
          <small>YM-{orderNumber}</small>
          <p className="ym-order-summary-line">
            {product.name} · {product.price}
          </p>
          <small className="ym-cart-hint">
            {deliveryType === "pickup" ? t.hintPickup : t.hintCourier}
          </small>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={`ym-trainer${studentMode ? " student-trainer-workspace" : ""}`}>
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
                : t.statusInProgress
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
                  label: t.nextAction,
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
