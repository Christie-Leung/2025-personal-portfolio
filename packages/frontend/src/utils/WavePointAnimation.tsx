import { PlayerAnimation, PlayerObject } from "skinview3d";

export class WavePointAnimation extends PlayerAnimation {
	private totalDuration = .0;

	protected animate(player: PlayerObject): void {
		let time = this.progress % this.totalDuration;

		const leftArm = player.skin.leftArm;
		const rightArm = player.skin.rightArm;
		const leftLeg = player.skin.leftLeg;
		const rightLeg = player.skin.rightLeg;
		const head = player.skin.head;

		// Clear previous rotations
		// leftArm.rotation.set(0, 0, 0);
		// rightArm.rotation.set(0, 0, 0);
		// leftLeg.rotation.set(0, 0, 0);
		// rightLeg.rotation.set(0, 0, 0);
		// head.rotation.set(0, 0, 0);
		// player.rotation.set(0, player.rotation.y, 0);

		// Phase timings
		const walkInStart = 0.0;
		const enterDuration = 1.5;
		const rotateFrontStart = 1.5;
		const waveStart = 4.0;
		const rotateLeftStart = 5.0;
		const punchStart = 5.5;
		const rotateBackStart = 6.5;
		const idleStart = 7.0;

		player.position.y = 2;

		// WALK IN: 0.0 - 1.5
		if (this.progress < rotateFrontStart) {
			const t = this.smoothstep(this.progress / (rotateFrontStart - walkInStart));
			player.rotation.y = Math.PI / 2;
			player.position.x = this.lerp(-10, 0, t);
			this.applyWalkingMotion(player, this.progress * 8);

			player.scale.set(0.4, 0.4, 0.4);
			return;
		}

		// Loop from waveStart onward
		time = ((this.progress - waveStart) % (this.totalDuration - waveStart)) + waveStart;

		// ROTATE TO FRONT: 1.5 - 2.0
		if (time < waveStart) {
			const t = (time - rotateFrontStart) / (waveStart - rotateFrontStart); // 0 → 1
			const smoothT = this.smoothstep(t); // optional smoothness
			const expT = 1 - Math.pow(1 - smoothT, 2); // exponential easing

			// Rotation: Left (π/2) → Front (0)
			player.rotation.y = this.lerp(Math.PI / 2, 0, expT);

			// Scaling: 0.4 → 0.7 (exponential easing)
			const scale = this.lerp(0.4, 0.7, expT);
			player.scale.set(scale, scale, scale);

			// Optional: Move forward on Z to give more 3D effect
			player.position.z = this.lerp(-5, 0, expT);

			// Walking animation
			this.applyWalkingMotion(player, this.progress * 8);
			return;
		}

		// WAVE: 2.0 - 3.0
		if (time < rotateLeftStart) {
			const t = (time - waveStart);
			player.rotation.y = 0;
			const waveProgress = t * 2 * Math.PI;
			rightArm.rotation.x = Math.PI * 0.9;
			rightArm.rotation.z = Math.sin(waveProgress) * 0.4;
			return;
		}

		// ROTATE TO LEFT (~-60°): 3.0 - 3.5
		if (time < punchStart) {
			const t = this.smoothstep((time - rotateLeftStart) / (punchStart - rotateLeftStart));
			player.rotation.y = this.lerp(0, Math.PI / 3, t);
			this.applyWalkingMotion(player, this.progress * 8);
			return;
		}

		// PUNCH (Twice): 3.5 - 4.5
		if (time < rotateBackStart) {
			player.rotation.y = Math.PI / 3;
			const t = (time - punchStart) * Math.PI * 2;
			const punchPower = Math.sin(t) * Math.exp((-(t - Math.PI) / Math.PI) ** 2); // smoother decay
			leftArm.rotation.x = -Math.PI / 2 + punchPower * 0.25;
			leftArm.rotation.z = -0.2;
			return;
		}

		// ROTATE BACK TO FRONT: 4.5 - 5.0
		if (time < idleStart) {
			const t = this.smoothstep((time - rotateBackStart) / (idleStart - rotateBackStart));
			player.rotation.y = this.lerp(Math.PI / 3, 0, t);
			leftArm.rotation.x = this.lerp(-Math.PI / 2, 0, t);
			leftArm.rotation.z = this.lerp(-0.2, 0, t);
			this.applyWalkingMotion(player, this.progress * 8);
			return;
		}

const alpha = 0.9;

// Smoothly reset rotations to zero
leftArm.rotation.x = this.lerp(leftArm.rotation.x, 0, alpha);
leftArm.rotation.y = this.lerp(leftArm.rotation.y, 0, alpha);
leftArm.rotation.z = this.lerp(leftArm.rotation.z, 0, alpha);

rightArm.rotation.x = this.lerp(rightArm.rotation.x, 0, alpha);
rightArm.rotation.y = this.lerp(rightArm.rotation.y, 0, alpha);
rightArm.rotation.z = this.lerp(rightArm.rotation.z, 0, alpha);

leftLeg.rotation.x = this.lerp(leftLeg.rotation.x, 0, alpha);
leftLeg.rotation.y = this.lerp(leftLeg.rotation.y, 0, alpha);
leftLeg.rotation.z = this.lerp(leftLeg.rotation.z, 0, alpha);

rightLeg.rotation.x = this.lerp(rightLeg.rotation.x, 0, alpha);
rightLeg.rotation.y = this.lerp(rightLeg.rotation.y, 0, alpha);
rightLeg.rotation.z = this.lerp(rightLeg.rotation.z, 0, alpha);

head.rotation.x = this.lerp(head.rotation.x, 0, alpha);
head.rotation.y = this.lerp(head.rotation.y, 0, alpha);
head.rotation.z = this.lerp(head.rotation.z, 0, alpha);

// Player body rotation: preserve Y (facing direction), reset X/Z
player.rotation.x = this.lerp(player.rotation.x, 0, alpha);
player.rotation.z = this.lerp(player.rotation.z, 0, alpha);

		// IDLE LOOP: 5.0 - 7.0
		const t = (time - idleStart) * 2;
		const swing = Math.cos(t) * 0.03;

		leftArm.rotation.z = swing + Math.PI * 0.02;
		rightArm.rotation.z = Math.cos(t + Math.PI) * 0.03 - Math.PI * 0.02;

		// Very subtle breathing/head motion
		head.rotation.y = Math.sin(t / 2) * 0.05;
		head.rotation.x = Math.sin(t / 2) * 0.025;

		
	}

	private lerp(a: number, b: number, t: number): number {
		return a + (b - a) * t;
	}

	private smoothstep(t: number): number {
		return t * t * (3 - 2 * t); // smoother than linear
	}

	private applyWalkingMotion(player: PlayerObject, t: number): void {
		const leftArm = player.skin.leftArm;
		const rightArm = player.skin.rightArm;
		const leftLeg = player.skin.leftLeg;
		const rightLeg = player.skin.rightLeg;
		const head = player.skin.head;
		const cape = player.cape;

		// Legs
		leftLeg.rotation.x = Math.sin(t) * 0.5;
		rightLeg.rotation.x = Math.sin(t + Math.PI) * 0.5;

		// Arms
		leftArm.rotation.x = Math.sin(t + Math.PI) * 0.5;
		rightArm.rotation.x = Math.sin(t) * 0.5;
		const zSwing = Math.PI * 0.02;
		leftArm.rotation.z = Math.cos(t) * 0.03 + zSwing;
		rightArm.rotation.z = Math.cos(t + Math.PI) * 0.03 - zSwing;

		// Head motion
		head.rotation.y = Math.sin(t / 4) * 0.2;
		head.rotation.x = Math.sin(t / 5) * 0.1;

		// Cape
		cape.rotation.x = Math.sin(t / 1.5) * 0.06 + Math.PI * 0.06;
	}
}
