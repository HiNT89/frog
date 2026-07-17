"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { muted: boolean; onComplete: () => void };

export default function FrogGame({ muted, onComplete }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let game: import("phaser").Game | undefined;
    let cancelled = false;

    void import("phaser").then((module) => {
      if (cancelled || !host.current) return;
      const Phaser = module.default;
      const width = Math.min(host.current.clientWidth, 720);
      const height = 470;
      const insectValues = [10, 20, 30, 50];

      class PondScene extends Phaser.Scene {
        private frogX = width / 2;
        private frogY = height - 94;
        private driftDirection = 1;
        private shooting = false;
        private insects: Array<{ sprite: import("phaser").GameObjects.Container; value: number; speed: number; baseY: number; phase: number; amplitude: number; wingRate: number }> = [];
        private tongue!: import("phaser").GameObjects.Graphics;
        private caught!: import("phaser").GameObjects.Text;
        private frogRig!: import("phaser").GameObjects.Container;
        private waterRipples!: import("phaser").GameObjects.Graphics;
        private pondFriends: Array<{ sprite: import("phaser").GameObjects.Container; leftHand: import("phaser").GameObjects.Graphics; rightHand: import("phaser").GameObjects.Graphics }> = [];
        private total = 0;

        create() {
          const g = this.add.graphics();
          g.fillStyle(0x8ed7e0, 1).fillRect(0, 0, width, height);
          for (let i = 0; i < 7; i++) {
            g.fillStyle(i % 2 ? 0x6bbbc8 : 0xb3e7e5, 0.2).fillEllipse((i * 131) % width, 70 + (i * 67) % height, 180, 20);
          }
          for (let i = 0; i < 18; i++) g.fillStyle(0xe1ffef, .13).fillCircle((i * 89) % width, 56 + (i * 53) % (height - 110), 2);
          this.waterRipples = this.add.graphics().setDepth(1);
          this.add.text(width / 2, 32, "BẮT CÔN TRÙNG!", { fontFamily: "Arial", fontSize: "14px", fontStyle: "bold", color: "#17606a" }).setOrigin(.5);
          this.tongue = this.add.graphics().setDepth(6);
          this.caught = this.add.text(width / 2, height / 2 - 28, "", { fontFamily: "Arial", fontSize: "30px" }).setOrigin(.5).setDepth(8);
          this.drawPondCreatures();
          this.drawFrog();
          this.time.addEvent({ delay: 930, loop: true, callback: () => this.spawnInsect() });
          for (let i = 0; i < 4; i++) this.time.delayedCall(300 + i * 220, () => this.spawnInsect());
          this.input.on("pointerdown", () => this.shoot());
          this.input.keyboard?.on("keydown-SPACE", (event: KeyboardEvent) => { event.preventDefault(); this.shoot(); });
        }

        drawFrog() {
          const lily = this.add.graphics();
          lily.fillStyle(0x155b50, .2).fillEllipse(0, 8, 190, 64);
          lily.fillStyle(0x276d55, 1).fillEllipse(0, 0, 178, 60);
          lily.fillStyle(0x428f68, 1).fillEllipse(-12, -7, 139, 37);
          lily.fillStyle(0x1d604b, 1).fillTriangle(14, 0, 90, 0, 48, -35);
          lily.lineStyle(1.5, 0x8fcf91, .6).lineBetween(-65, 0, 15, 0).lineBetween(-48, -16, 12, -1).lineBetween(-42, 15, 13, 1);

          const body = this.add.graphics();
          body.fillStyle(0x164d3a, .28).fillEllipse(0, 9, 70, 55);
          body.fillStyle(0x319d62, 1).fillEllipse(-28, 15, 48, 28).fillEllipse(28, 15, 48, 28);
          body.fillStyle(0x4cc875, 1).fillEllipse(0, 1, 50, 62);
          body.fillStyle(0x9cdb83, .82).fillEllipse(0, 2, 28, 43);
          body.fillStyle(0xeaffdf, 1).fillCircle(-16, -25, 11).fillCircle(16, -25, 11);
          body.fillStyle(0x6f9d4c, 1).fillCircle(-16, -26, 5).fillCircle(16, -26, 5);
          body.fillStyle(0x152f2a, 1).fillCircle(-16, -26, 2.5).fillCircle(16, -26, 2.5);
          body.fillStyle(0xf2a8ae, .78).fillCircle(-20, 5, 4).fillCircle(20, 5, 4);
          body.lineStyle(2.4, 0x216346, 1).beginPath().moveTo(-9, 8).lineTo(0, 12).lineTo(9, 8).strokePath();

          lily.setY(48);
          this.frogRig = this.add.container(this.frogX, this.frogY, [lily, body]).setDepth(4);
        }

        drawPondCreatures() {
          const drawSnail = (x: number, y: number, shellColor: number) => {
            const snail = this.add.graphics();
            snail.fillStyle(0x3f8c6a, 1).fillEllipse(0, 9, 53, 19);
            snail.fillStyle(shellColor, 1).fillCircle(-8, -5, 19);
            snail.lineStyle(2.5, 0xffe8b5, .85).strokeCircle(-8, -5, 11).lineBetween(-8, -5, 0, -3);
            snail.fillStyle(0xe9ffe9, 1).fillCircle(18, -2, 4).fillCircle(25, -4, 4);
            snail.fillStyle(0x243d39, 1).fillCircle(18, -2, 1.5).fillCircle(25, -4, 1.5);
            const leftHand = this.add.graphics();
            leftHand.lineStyle(3, 0x3f8c6a, 1).lineBetween(0, 0, -11, -10).fillStyle(0x93cb85, 1).fillCircle(-11, -10, 3);
            leftHand.setPosition(16, 8);
            const rightHand = this.add.graphics();
            rightHand.lineStyle(3, 0x3f8c6a, 1).lineBetween(0, 0, 11, -11).fillStyle(0x93cb85, 1).fillCircle(11, -11, 3);
            rightHand.setPosition(26, 8);
            const sprite = this.add.container(x, y, [snail, leftHand, rightHand]).setDepth(2);
            this.tweens.add({ targets: sprite, x: x + 18, duration: 3800, yoyo: true, repeat: -1, ease: "Sine.inOut" });
            this.pondFriends.push({ sprite, leftHand, rightHand });
          };
          drawSnail(96, height - 82, 0xf2ad87);
          drawSnail(width - 110, height - 142, 0xb897d5);

          const crab = this.add.graphics();
          crab.fillStyle(0xf17c68, 1).fillEllipse(0, 2, 43, 30);
          crab.fillStyle(0xf6977d, 1).fillEllipse(0, -2, 29, 18);
          crab.lineStyle(3, 0xd95754, 1).lineBetween(-17, 8, -28, 18).lineBetween(-10, 13, -18, 23).lineBetween(17, 8, 28, 18).lineBetween(10, 13, 18, 23);
          crab.fillStyle(0xeaffdf, 1).fillCircle(-9, -14, 6).fillCircle(9, -14, 6);
          crab.fillStyle(0x203c3d, 1).fillCircle(-9, -14, 2).fillCircle(9, -14, 2);
          const leftClaw = this.add.graphics();
          leftClaw.lineStyle(3, 0xd95754, 1).lineBetween(0, 0, -12, -10).lineBetween(-12, -10, -18, -9).lineBetween(-12, -10, -13, -16);
          leftClaw.setPosition(-17, -2);
          const rightClaw = this.add.graphics();
          rightClaw.lineStyle(3, 0xd95754, 1).lineBetween(0, 0, 12, -10).lineBetween(12, -10, 18, -9).lineBetween(12, -10, 13, -16);
          rightClaw.setPosition(17, -2);
          const crabSprite = this.add.container(width - 88, height - 72, [crab, leftClaw, rightClaw]).setDepth(2);
          this.tweens.add({ targets: crabSprite, y: height - 77, duration: 950, yoyo: true, repeat: -1, ease: "Sine.inOut" });
          this.pondFriends.push({ sprite: crabSprite, leftHand: leftClaw, rightHand: rightClaw });
        }

        celebrateFriends() {
          for (const friend of this.pondFriends) {
            this.tweens.killTweensOf([friend.leftHand, friend.rightHand]);
            friend.leftHand.setAngle(0);
            friend.rightHand.setAngle(0);
            this.tweens.add({ targets: friend.leftHand, angle: -38, duration: 105, yoyo: true, repeat: 3, ease: "Sine.inOut" });
            this.tweens.add({ targets: friend.rightHand, angle: 38, duration: 105, yoyo: true, repeat: 3, ease: "Sine.inOut" });
            this.tweens.add({ targets: friend.sprite, scaleX: 1.08, scaleY: .94, duration: 115, yoyo: true, repeat: 2, ease: "Sine.inOut" });
          }
        }

        spawnInsect() {
          if (this.insects.length > 8 || this.total >= 100) return;
          const fromLeft = Math.random() > .5;
          const species = Phaser.Math.Between(0, 3);
          const color = Phaser.Utils.Array.GetRandom([0xd3eef2, 0xecc0d9, 0x9fd58c, 0xf0c960, 0xb7a1df]);
          const drawing = this.add.graphics();
          if (species === 0) {
            drawing.fillStyle(color, .62).fillEllipse(-10, -3, 23, 11).fillEllipse(10, -3, 23, 11);
            drawing.fillStyle(0x284d50, 1).fillEllipse(0, 2, 6, 28);
          } else if (species === 1) {
            drawing.fillStyle(color, .9).fillEllipse(-9, -5, 17, 20).fillEllipse(9, -5, 17, 20).fillEllipse(-7, 10, 13, 16).fillEllipse(7, 10, 13, 16);
            drawing.fillStyle(0x3b4152, 1).fillEllipse(0, 4, 5, 24);
          } else if (species === 2) {
            drawing.fillStyle(0xffe38a, .28).fillCircle(0, 0, 19);
            drawing.fillStyle(0xffd95a, 1).fillCircle(0, 0, 7);
            drawing.fillStyle(0x5d563c, 1).fillEllipse(0, 6, 6, 13);
          } else {
            drawing.fillStyle(color, .7).fillEllipse(-9, -4, 18, 12).fillEllipse(9, -4, 18, 12);
            drawing.fillStyle(0x405541, 1).fillEllipse(0, 2, 13, 22).fillCircle(0, -10, 5);
          }
          const baseY = Phaser.Math.Between(82, 265);
          const sprite = this.add.container(fromLeft ? -30 : width + 30, baseY, [drawing]).setDepth(5);
          this.insects.push({ sprite, value: Phaser.Utils.Array.GetRandom(insectValues), speed: (fromLeft ? 1 : -1) * Phaser.Math.Between(34, 68), baseY, phase: Math.random() * Math.PI * 2, amplitude: Phaser.Math.Between(5, 22), wingRate: Phaser.Math.Between(48, 86) });
        }

        drawWaterRipples(time: number) {
          this.waterRipples.clear();
          for (let i = 0; i < 5; i++) {
            const progress = (time * .00014 + i * .21) % 1;
            this.waterRipples.lineStyle(1.4, 0xe4fff1, (1 - progress) * .34).strokeEllipse(55 + (i * 143) % width, 90 + (i * 61) % 280, 32 + progress * 110, 7 + progress * 16);
          }
          const wake = (time * .00038) % 1;
          this.waterRipples.lineStyle(1.5, 0xe9fff3, (1 - wake) * .38).strokeEllipse(this.frogRig.x, this.frogRig.y + 52, 110 + wake * 78, 20 + wake * 15);
        }

        update(time: number, delta: number) {
          this.frogRig.x += this.driftDirection * delta * .042;
          if (this.frogRig.x >= width - 108 || this.frogRig.x <= 108) this.driftDirection *= -1;
          this.frogRig.y = this.frogY + Math.sin(time / 620) * 3;
          this.drawWaterRipples(time);
          for (const insect of [...this.insects]) {
            insect.sprite.x += insect.speed * delta / 1000;
            insect.sprite.y = insect.baseY + Math.sin(time / insect.wingRate + insect.phase) * insect.amplitude;
            insect.sprite.rotation = Math.sin(time / 530 + insect.phase) * .12;
            insect.sprite.scaleY = .87 + Math.sin(time / insect.wingRate + insect.phase) * .13;
            if (insect.sprite.x < -60 || insect.sprite.x > width + 60) this.removeInsect(insect);
          }
        }

        shoot() {
          if (this.shooting || this.total >= 100) return;
          this.shooting = true;
          const mouthX = this.frogRig.x;
          const mouthY = this.frogRig.y - 30;
          const maxEndY = 58;
          const hitWidth = 27;
          const candidates = this.insects.map((item) => ({ item, distance: mouthY - item.sprite.y, offset: Math.abs(mouthX - item.sprite.x) }))
            .filter(({ distance, offset }) => distance > 0 && distance <= mouthY - maxEndY && offset <= hitWidth)
            .sort((a, b) => a.distance - b.distance || a.offset - b.offset);
          const target = candidates[0];
          const endY = target ? target.item.sprite.y : maxEndY;
          const reach = mouthY - endY;
          this.tongue.clear().lineStyle(8, 0xf47fae, 1).beginPath().moveTo(mouthX, mouthY).lineTo(mouthX, endY).strokePath().fillStyle(0xffb6c8, 1).fillCircle(mouthX, endY, 5);
          const hit = target?.item;
          if (hit) {
            this.removeInsect(hit);
            this.total = Math.min(100, this.total + hit.value);
            setScore(this.total);
            this.caught.setText(`+${hit.value} ${hit.value === 50 ? "✨" : ""}`).setAlpha(1);
            this.tweens.add({ targets: this.caught, y: this.caught.y - 32, alpha: 0, duration: 600, onComplete: () => this.caught.setY(height / 2 - 28) });
            this.celebrateFriends();
            this.tweens.add({ targets: this.frogRig, scaleX: 1.08, scaleY: .93, duration: 110, yoyo: true, repeat: 1, ease: "Sine.inOut" });
            if (this.total >= 100) this.time.delayedCall(650, onComplete);
          }
          this.time.delayedCall(Math.max(190, Math.min(410, reach * 1.35)), () => { this.tongue.clear(); this.shooting = false; });
        }

        removeInsect(insect: { sprite: import("phaser").GameObjects.Container }) {
          insect.sprite.destroy();
          this.insects = this.insects.filter((item) => item !== insect);
        }
      }
      game = new Phaser.Game({ type: Phaser.AUTO, width, height, parent: host.current, backgroundColor: "#8ed7e0", scene: PondScene, scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH } });
    });
    return () => { cancelled = true; game?.destroy(true); };
  }, [onComplete]);

  return (
    <motion.section className="game-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="game-header"><span>🐸 Hồ sen tĩnh lặng</span><span className="target">Mục tiêu <b>100</b></span></header>
      <div className="score-card"><span>Điểm số</span><strong>{score}</strong><small>/ 100</small></div>
      <div ref={host} className="game-canvas" aria-label="Trò chơi bắt côn trùng" />
      <p className="game-help">Đợi côn trùng bay qua phía trên ếch, rồi nhấp hoặc nhấn Space để phóng lưỡi</p>
      {muted && <span className="muted-note">Âm thanh đang tắt</span>}
      <div className="mobile-blocker" role="status">
        <span aria-hidden="true">🖥️</span>
        <h2>Trò chơi cần màn hình lớn hơn</h2>
        <p>Hãy mở lại trên máy tính hoặc máy tính bảng ngang để ngắm trọn mặt hồ và điều khiển chú ếch.</p>
      </div>
    </motion.section>
  );
}
