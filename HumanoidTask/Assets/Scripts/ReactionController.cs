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

    public SkinnedMeshRenderer faceMesh;   // Assign MTH_DEF

    private bool isRunning = false;
    private bool queued = false;

    // Blendshape indices
    int smile1, smile2;
    int sad1, conf1, angry1;
    int jawOpen;

    void Start()
    {
        audioSource.clip = dialogueClip;
        playButton.onClick.AddListener(OnPlayPressed);

        charState.text = "Idle";

        // Read blendshape indices from mesh
        smile1 = faceMesh.sharedMesh.GetBlendShapeIndex("MTH_SMILE1");
        smile2 = faceMesh.sharedMesh.GetBlendShapeIndex("MTH_SMILE2");
        sad1 = faceMesh.sharedMesh.GetBlendShapeIndex("MTH_SAP");   // sad mouth
        conf1 = faceMesh.sharedMesh.GetBlendShapeIndex("MTH_CONF");  // worried brows
        angry1 = faceMesh.sharedMesh.GetBlendShapeIndex("MTH_ANG1");  // slight pinch
        jawOpen = faceMesh.sharedMesh.GetBlendShapeIndex("MTH_A");

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

        audioSource.Play();
        lipSync.StartLipSync(audioSource);
        charState.text = "Speaking...";

        // Run emotion sequence in parallel with audio
        yield return StartCoroutine(RunEmotionSequence());

        // Wait until audio fully finishes
        while (audioSource.isPlaying)
            yield return null;

        // Stop lip sync
        lipSync.StopLipSync();
        charState.text = "Idle";

        // Reset audio for next button press
        audioSource.Stop();
        audioSource.time = 0f;

        isRunning = false;

        // If button was pressed during playback → auto replay
        if (queued)
        {
            queued = false;
            StartCoroutine(FullSequence());
        }
    }

    IEnumerator RunEmotionSequence()
    {
        // SMILE
        yield return PlaySmile();
        yield return WaitForState("Idle");

        // SAD
        yield return PlaySad();
        yield return WaitForState("Idle");

        // SMILE AGAIN
        yield return PlaySmile();
        yield return WaitForState("Idle");

        // SAD AGAIN
        yield return PlaySad();
        yield return WaitForState("Idle");
    }

    // -------------------------------
    // EMOTION FUNCTIONS
    // -------------------------------

    IEnumerator PlaySmile()
    {
        charState.text = "Smile";

        ClearAllBlendshapes();
        SetExpression(smile1, 85f);
        SetExpression(smile2, 60f);

        animator.SetTrigger("SmileTrigger");

        while (!animator.GetCurrentAnimatorStateInfo(0).IsName("Smile"))
            yield return null;

        float len = animator.GetCurrentAnimatorStateInfo(0).length;
        yield return new WaitForSeconds(len);

        ClearAllBlendshapes();
    }

    IEnumerator PlaySad()
    {
        charState.text = "Sad";

        ClearAllBlendshapes();

        // Sad mouth droop
        SetExpression(sad1, 90f);

        // Lower brows for dull/tired look
        if (conf1 >= 0) SetExpression(conf1, 40f);

        // Very slight brow pinch for emotional depth
        if (angry1 >= 0) SetExpression(angry1, 8f);

        // NEW → Slight jaw open for dull/sad look
        if (jawOpen >= 0) SetExpression(jawOpen, 18f);

        animator.SetTrigger("SadTrigger");

        while (!animator.GetCurrentAnimatorStateInfo(0).IsName("Sad"))
            yield return null;

        float len = animator.GetCurrentAnimatorStateInfo(0).length;
        yield return new WaitForSeconds(len);

        ClearAllBlendshapes();
    }


    // -------------------------------
    // BLENDSHAPE HELPERS
    // -------------------------------

    void SetExpression(int index, float value)
    {
        if (index >= 0)
            faceMesh.SetBlendShapeWeight(index, value);
    }

    void ClearAllBlendshapes()
    {
        for (int i = 0; i < faceMesh.sharedMesh.blendShapeCount; i++)
            faceMesh.SetBlendShapeWeight(i, 0);
    }

    // -------------------------------
    // WAIT FOR STATE
    // -------------------------------

    IEnumerator WaitForState(string stateName)
    {
        while (!animator.GetCurrentAnimatorStateInfo(0).IsName(stateName))
            yield return null;
    }
}
