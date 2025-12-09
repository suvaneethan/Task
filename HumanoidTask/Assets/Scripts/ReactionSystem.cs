using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class ReactionSystem : MonoBehaviour
{
    [Header("UI")]
    public Button playButton;

    [Header("Character Animator")]
    public Animator animator;

    [Header("Face Blendshapes")]
    public SkinnedMeshRenderer faceMesh;
    private int smileIndex;
    private int sadIndex;
    private int mouthIndex;

    [Header("Body Bones")]
    public Transform headBone;
    public Transform chestBone;

    [Header("Audio")]
    public AudioSource audioSource;
    public AudioClip dialogueClip;

    private bool isRunning = false;
    private bool queuedClick = false;

    void Start()
    {
        playButton.onClick.AddListener(OnPlayPressed);

        // Load blendshapes
        smileIndex = faceMesh.sharedMesh.GetBlendShapeIndex("Smile");
        sadIndex = faceMesh.sharedMesh.GetBlendShapeIndex("Sad");
        mouthIndex = faceMesh.sharedMesh.GetBlendShapeIndex("MTH_A");

        audioSource.clip = dialogueClip;
    }

    void OnPlayPressed()
    {
        if (isRunning)
        {
            queuedClick = true;   // ignore & queue
            return;
        }

        StartCoroutine(PlayFullSequence());
    }

    IEnumerator PlayFullSequence()
    {
        isRunning = true;
        queuedClick = false;

        // ---------------------------------------
        // Start Audio + Lip Sync
        // ---------------------------------------
        audioSource.Play();
        StartCoroutine(LipSyncRoutine());

        // ---------------------------------------
        // Reaction Sequence
        // ---------------------------------------
        yield return StartCoroutine(DoSmile());
        yield return StartCoroutine(DoSad());
        yield return StartCoroutine(DoSmile());
        yield return StartCoroutine(DoSad());

        // Wait for audio finish
        while (audioSource.isPlaying)
            yield return null;

        ResetFace();
        ResetBody();

        isRunning = false;

        // If user clicked again during sequence
        if (queuedClick)
            StartCoroutine(PlayFullSequence());
    }

    // -----------------------
    // SMILE ACTION
    // -----------------------
    IEnumerator DoSmile()
    {
        ResetFace();

        // Face smile
        SetBlend(smileIndex, 100);

        // Body positive gesture (head tilt & small raise)
        if (headBone != null)
            headBone.localEulerAngles = new Vector3(-10f, 0, 0);

        if (chestBone != null)
            chestBone.localEulerAngles = new Vector3(-5f, 0, 0);

        yield return new WaitForSeconds(1f);
    }

    // -----------------------
    // SAD ACTION
    // -----------------------
    IEnumerator DoSad()
    {
        ResetFace();

        // Face sad
        SetBlend(sadIndex, 100);

        // body droop / head down
        if (headBone != null)
            headBone.localEulerAngles = new Vector3(15f, 0, 0);

        if (chestBone != null)
            chestBone.localEulerAngles = new Vector3(10f, 0, 0);

        yield return new WaitForSeconds(1f);
    }

    // -----------------------
    // LIP SYNC (Audio Reactive)
    // -----------------------
    IEnumerator LipSyncRoutine()
    {
        float[] spectrum = new float[128];

        while (audioSource.isPlaying)
        {
            audioSource.GetOutputData(spectrum, 0);

            float loudness = 0f;
            foreach (float f in spectrum)
                loudness += Mathf.Abs(f);

            loudness = Mathf.Clamp(loudness * 200f, 0, 100);

            SetBlend(mouthIndex, loudness);

            yield return new WaitForSeconds(0.05f);
        }

        SetBlend(mouthIndex, 0);
    }

    // -----------------------
    // Helpers
    // -----------------------

    void SetBlend(int index, float value)
    {
        if (index >= 0)
            faceMesh.SetBlendShapeWeight(index, value);
    }

    void ResetFace()
    {
        for (int i = 0; i < faceMesh.sharedMesh.blendShapeCount; i++)
            faceMesh.SetBlendShapeWeight(i, 0);
    }

    void ResetBody()
    {
        if (headBone != null)
            headBone.localEulerAngles = Vector3.zero;

        if (chestBone != null)
            chestBone.localEulerAngles = Vector3.zero;
    }
}
