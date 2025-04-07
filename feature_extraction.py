#pip install librosa matplotlib scipy numpy
import librosa
import numpy as np
import matplotlib.pyplot as plt
import scipy.signal
import os

audios= "n6.wav"
audio_file = os.path.abspath(audios)
print("Loading file from:", audio_file)

def load_audio(file_path):
    """ Load the audio file and return the waveform & sampling rate """
    y, sr = librosa.load(file_path, sr=None, mono=True)
    return y, sr

def detect_madd(y, sr):
    """ Analyze vowel duration to detect Madd (elongation) """
    # Compute Short-Term Energy (STE)
    frame_length = int(0.025 * sr)  # 25ms frames
    hop_length = int(0.01 * sr)  # 10ms hop
    energy = np.array([
        sum(abs(y[i:i+frame_length])**2)
        for i in range(0, len(y)-frame_length, hop_length)
    ])

    # Identify peaks in vowel energy (Madd regions)
    peaks, _ = scipy.signal.find_peaks(energy, height=np.mean(energy)*1.2)

    # Calculate the duration of high-energy peaks (possible Madd)
    durations = np.diff(peaks) * (hop_length / sr)  # Convert to seconds

    # Madd detection: If vowel elongation is > certain threshold
    madd_detected = any(d > 0.3 for d in durations)  # Madd typically > 300ms

    return madd_detected, durations

# def detect_ghunna(y, sr, threshold_factor=1.5):
#     """ Analyze nasalization by checking low-frequency components with dynamic threshold """
#     # Compute Mel-Frequency Cepstral Coefficients (MFCCs)
#     mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)

#     # Focus on low-frequency MFCCs (1st and 2nd coefficients)
#     low_freq_mfcc = mfccs[1:3, :]

#     # Compute the variance to check nasal consistency
#     variance = np.var(low_freq_mfcc)

#     # Dynamic threshold based on computed variance
#     threshold = variance * threshold_factor  

#     # If variance is below threshold, Ghunna is detected
#     ghunna_detected = variance < threshold  

#     return ghunna_detected, variance, threshold

def detect_ghunna(y, sr, min_threshold=15800, max_threshold=19200):
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)
    low_freq_mfcc = mfccs[1:3, :]
    variance = np.var(low_freq_mfcc)
    ghunna_detected = min_threshold <= variance <= max_threshold
    return ghunna_detected, variance, (min_threshold, max_threshold)


def plot_spectrogram(y, sr):
    """ Plot a spectrogram to visualize Madd & Ghunna patterns """
    plt.figure(figsize=(10, 4))
    S = librosa.feature.melspectrogram(y=y, sr=sr)
    librosa.display.specshow(librosa.power_to_db(S, ref=np.max), sr=sr, x_axis='time', y_axis='mel')
    plt.colorbar(format='%+2.0f dB')
    plt.title("Mel Spectrogram")
    plt.show()

# Example usage
if __name__ == "__main__":
    audio_file = audios  # Replace with actual user recording
    y, sr = load_audio(audio_file)

    madd_detected, madd_durations = detect_madd(y, sr)
    ghunna_detected, ghunna_variance, ghunna_threshold = detect_ghunna(y, sr)

    print(f"Madd Detected: {madd_detected}, Durations: {madd_durations}")
    print(f"Ghunna Detected: {ghunna_detected}, Variance: {ghunna_variance}, Threshold: {ghunna_threshold}")

    plot_spectrogram(y, sr)
    
