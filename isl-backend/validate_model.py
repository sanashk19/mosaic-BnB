import os
os.environ['TF_USE_LEGACY_KERAS'] = '1'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
import numpy as np

model_path = 'isl-backend/isl_modelv3.h5'
class_path = 'isl-backend/class_names.npy'

model = tf.keras.models.load_model(model_path)
classes = np.load(class_path, allow_pickle=True).tolist()

print(f"Loaded model. Input shape: {model.input_shape}, Output shape: {model.output_shape}")
print(f"Loaded {len(classes)} classes.")

# 1. Check weight statistics of input layer to determine expected input range
first_layer_weights = model.layers[0].get_weights()[0] # shape (126, 256)
# Each LSTM unit has 4 gates: input, forget, cell, output (64 * 4 = 256)
# Look at weights for x, y, z features
# Indices: 0=x, 1=y, 2=z, 3=x, 4=y, 5=z ...
x_weights = first_layer_weights[0::3, :]
y_weights = first_layer_weights[1::3, :]
z_weights = first_layer_weights[2::3, :]

print(f"X weights mean: {np.mean(x_weights):.5f}, std: {np.std(x_weights):.5f}")
print(f"Y weights mean: {np.mean(y_weights):.5f}, std: {np.std(y_weights):.5f}")
print(f"Z weights mean: {np.mean(z_weights):.5f}, std: {np.std(z_weights):.5f}")

# Compare Hand 1 (indices 0..62) vs Hand 2 (indices 63..125)
h1_weights = first_layer_weights[:63, :]
h2_weights = first_layer_weights[63:, :]
print(f"Hand 1 weights mean: {np.mean(h1_weights):.5f}, std: {np.std(h1_weights):.5f}")
print(f"Hand 2 weights mean: {np.mean(h2_weights):.5f}, std: {np.std(h2_weights):.5f}")

# 2. Test predictions with various realistic inputs
# Test a zero array (no hand)
zero_in = np.zeros((1, 30, 126))
p_zero = model.predict(zero_in, verbose=0)[0]
top_idx = np.argsort(p_zero)[::-1][:5]
print("\n--- Zero input top 5 predictions ---")
for idx in top_idx:
    print(f"  {classes[idx]}: {p_zero[idx]*100:.2f}%")

# Test a realistic normalized hand in slot 1 (typical MediaPipe x in [0.4..0.6], y in [0.4..0.8], z in [-0.05..0.05])
np.random.seed(42)
realistic_hand = np.zeros((1, 30, 126))
for t in range(30):
    for pt in range(21):
        realistic_hand[0, t, pt*3] = 0.5 + 0.1 * np.cos(pt)
        realistic_hand[0, t, pt*3 + 1] = 0.6 + 0.15 * np.sin(pt)
        realistic_hand[0, t, pt*3 + 2] = 0.01 * np.cos(pt)

p_h1 = model.predict(realistic_hand, verbose=0)[0]
top_idx = np.argsort(p_h1)[::-1][:5]
print("\n--- 1-Hand input in Slot 1 top 5 predictions ---")
for idx in top_idx:
    print(f"  {classes[idx]}: {p_h1[idx]*100:.2f}%")

# Test realistic 2-hand input (both hands)
realistic_2hand = np.copy(realistic_hand)
for t in range(30):
    for pt in range(21):
        realistic_2hand[0, t, 63 + pt*3] = 0.3 + 0.1 * np.cos(pt)
        realistic_2hand[0, t, 63 + pt*3 + 1] = 0.6 + 0.15 * np.sin(pt)
        realistic_2hand[0, t, 63 + pt*3 + 2] = 0.01 * np.cos(pt)

p_h2 = model.predict(realistic_2hand, verbose=0)[0]
top_idx = np.argsort(p_h2)[::-1][:5]
print("\n--- 2-Hand input (both slots) top 5 predictions ---")
for idx in top_idx:
    print(f"  {classes[idx]}: {p_h2[idx]*100:.2f}%")
