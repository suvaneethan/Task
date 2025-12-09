using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ReactionController : MonoBehaviour
{
    public Button playButton;
    public Animator animator;
    public AudioSource audioSource;
    public AudioClip dialogueClip;
    public LipSyncController lipSync;
    public TextMeshProUGUI charState;

    private bool isRunning = false;
    private bool queued = false;

    void Start()
    {
        audioSource.clip = dialogueClip;
        playButton.onClick.AddListener(OnPlayPressed);

        charState.text = "Idle";
    }

    void OnPlayPressed()
    {
        if (isRunning)
        {
            queued = true;
            return;
        }
        StartCoroutine(FullSequence());
    }

    IEnumerator FullSequence()
    {
        isRunning = true;
        queued = false;

        audioSource.Stop();
        audioSource.time = 0f;

        // 1️⃣ Smile → Idle
        yield return PlayAnimation("SmileTrigger", "Smile", "Smile");
        yield return WaitForState("Idle");
        charState.text = "Idle";

        // 2️⃣ Sad → Idle
        yield return PlayAnimation("SadTrigger", "Sad", "Sad");
        yield return WaitForState("Idle");
        charState.text = "Idle";

        // 3️⃣ Smile → Idle
        yield return PlayAnimation("SmileTrigger", "Smile", "Smile");
        yield return WaitForState("Idle");
        charState.text = "Idle";

        // 4️⃣ Sad → Idle
        yield return PlayAnimation("SadTrigger", "Sad", "Sad");
        yield return WaitForState("Idle");
        charState.text = "Idle";

        // 5️⃣ SPEAKING + AUDIO
        charState.text = "Speaking...";
        audioSource.Play();
        lipSync.StartLipSync(audioSource);

        while (audioSource.isPlaying)
            yield return null;

        lipSync.StopLipSync();

        charState.text = "Idle";

        isRunning = false;

        if (queued)
            StartCoroutine(FullSequence());
    }

    IEnumerator PlayAnimation(string trigger, string stateName, string stateText)
    {
        charState.text = stateText;

        animator.ResetTrigger("SmileTrigger");
        animator.ResetTrigger("SadTrigger");

        animator.SetTrigger(trigger);

        // Wait to enter the correct animation state
        while (!animator.GetCurrentAnimatorStateInfo(0).IsName(stateName))
            yield return null;

        float len = animator.GetCurrentAnimatorStateInfo(0).length;
        yield return new WaitForSeconds(len);
    }

    IEnumerator WaitForState(string stateName)
    {
        while (!animator.GetCurrentAnimatorStateInfo(0).IsName(stateName))
            yield return null;
    }
}
