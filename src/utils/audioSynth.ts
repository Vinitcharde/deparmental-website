// Web Audio API Synthesizer for Mythic / Cyber Audio Experience

class OdysseyAudio {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private ambientOscs: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleAudio(): boolean {
    this.initContext();
    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startAmbientDrone();
      this.playChime(523.25, 'triangle', 0.2); // C5
      setTimeout(() => this.playChime(659.25, 'triangle', 0.25), 120); // E5
      setTimeout(() => this.playChime(783.99, 'sine', 0.3), 240); // G5
    } else {
      this.stopAmbientDrone();
    }
    return this.isEnabled;
  }

  public getAudioState(): boolean {
    return this.isEnabled;
  }

  public playFrameTick(frequency: number = 440) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.7, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // AudioContext safe catch
    }
  }

  public playChime(freq: number = 880, type: OscillatorType = 'sine', duration: number = 0.3) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext safe catch
    }
  }

  private startAmbientDrone() {
    if (!this.ctx) return;
    this.stopAmbientDrone();

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 2.0);
      this.ambientGain.connect(this.ctx.destination);

      // Deep Greek cinematic minor drone: A2, E3, A3, C#4
      const freqs = [110, 164.81, 220, 277.18];
      freqs.forEach((f) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);
        osc.connect(this.ambientGain);
        osc.start();
        this.ambientOscs.push(osc);
      });
    } catch {
      // Ignore
    }
  }

  private stopAmbientDrone() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.ambientOscs.forEach((osc) => {
            try {
              osc.stop();
            } catch {
              // Ignore
            }
          });
          this.ambientOscs = [];
        }, 550);
      } catch {
        this.ambientOscs = [];
      }
    }
  }
}

export const odysseyAudio = new OdysseyAudio();
